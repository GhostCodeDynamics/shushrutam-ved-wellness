import {
  Appointment,
  APPOINTMENT_STATUSES,
  canTransition,
} from "../models/index.js";
import { adminAppointment, createAppointment, publicAppointment } from "../services/appointment.service.js";
import { AppError, validationError } from "../utils/AppError.js";
import { cleanString } from "../utils/sanitize.js";
import { notifyAppointmentStatusChanged } from "../services/email.service.js";
import { assertAppointmentPayload } from "../validators/appointment.validator.js";

export async function create(req, res, next) {
  try {
    const payload = assertAppointmentPayload(req.body);
    const ip = req.ip || "";
    const userAgent = req.get("user-agent") || "";

    const appointment = await createAppointment(payload, { ip, userAgent });
    res.status(201).json({ appointment: publicAppointment(appointment) });
  } catch (error) {
    next(error);
  }
}

export async function lookupByRef(req, res, next) {
  try {
    const ref = cleanString(req.params.ref, { max: 20 }).toUpperCase();
    if (!ref) return next(new AppError("Reference is required", 400));
    const appointment = await Appointment.findOne({ ref }).lean();
    if (!appointment) return next(new AppError("Appointment not found", 404));
    res.json({ appointment: publicAppointment(appointment) });
  } catch (error) {
    next(error);
  }
}

function parsePagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

export async function adminList(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const filter = {};
    if (APPOINTMENT_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      const search = cleanString(req.query.search, { max: 60 });
      if (search) {
        const re = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        filter.$or = [{ name: re }, { phone: re }, { email: re }, { ref: re }];
      }
    }

    const [items, total] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Appointment.countDocuments(filter),
    ]);

    res.json({
      items: items.map(adminAppointment),
      pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    next(error);
  }
}

export async function adminDetail(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id).lean();
    if (!appointment) return next(new AppError("Appointment not found", 404));
    res.json({ appointment: adminAppointment(appointment) });
  } catch (error) {
    next(error);
  }
}

export async function adminUpdate(req, res, next) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return next(new AppError("Appointment not found", 404));

    const { status, notes } = req.body || {};

    if (status !== undefined) {
      if (!APPOINTMENT_STATUSES.includes(status)) {
        throw validationError("Invalid appointment status", [
          { field: "status", message: `Must be one of: ${APPOINTMENT_STATUSES.join(", ")}` },
        ]);
      }
      if (!canTransition(appointment.status, status)) {
        throw validationError(
          `Cannot change status from "${appointment.status}" to "${status}"`,
          [{ field: "status", message: "Transition not allowed" }],
        );
      }
      appointment.status = status;
      const now = new Date();
      appointment.confirmedAt = status === "confirmed" ? now : appointment.confirmedAt;
      appointment.completedAt = status === "completed" ? now : appointment.completedAt;
      appointment.cancelledAt = status === "cancelled" ? now : appointment.cancelledAt;
      appointment.rejectedAt = status === "rejected" ? now : appointment.rejectedAt;
    }

    await appointment.save();
    if (status !== undefined) {
      void notifyAppointmentStatusChanged(appointment);
    }
    if (notes !== undefined) {
      appointment.notes = cleanString(notes, { max: 4000 });
    }

    await appointment.save();
    res.json({ appointment: adminAppointment(appointment) });
  } catch (error) {
    next(error);
  }
}

export async function adminDelete(req, res, next) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return next(new AppError("Appointment not found", 404));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}