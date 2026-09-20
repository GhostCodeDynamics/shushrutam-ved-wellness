import { Appointment, BlogPost, Condition, Faq, Service } from "../models/index.js";

export async function dashboard(req, res, next) {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      pending,
      today,
      totalEnquiries,
      publishedBlogs,
      services,
      faqs,
      conditions,
      recent,
    ] = await Promise.all([
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ createdAt: { $gte: startOfToday } }),
      Appointment.countDocuments({}),
      BlogPost.countDocuments({ isPublished: true }),
      Service.countDocuments({}),
      Faq.countDocuments({}),
      Condition.countDocuments({}),
      Appointment.find().sort({ createdAt: -1 }).limit(8).lean(),
    ]);

    res.json({
      counts: {
        pendingAppointments: pending,
        todaysEnquiries: today,
        totalAppointments: totalEnquiries,
        publishedBlogs,
        services,
        faqs,
        conditions,
      },
      recentEnquiries: recent.map((a) => ({
        id: String(a._id),
        ref: a.ref,
        name: a.name,
        phone: a.phone,
        status: a.status,
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}