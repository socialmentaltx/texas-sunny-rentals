export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export default async function AdminInquiries() {
  const inquiries = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-gray-800 mb-8">Inquiries</h1>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
          No inquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`bg-white rounded-2xl shadow p-6 border-l-4 ${inq.read ? "border-gray-200" : "border-orange-500"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-gray-800 text-lg">{inq.name}</h3>
                    {!inq.read && (
                      <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{inq.email} {inq.phone && `· ${inq.phone}`}</p>
                  {inq.eventDate && (
                    <p className="text-sm text-gray-500">
                      Event: {new Date(inq.eventDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-400">{new Date(inq.createdAt).toLocaleString()}</p>
                  <a
                    href={`mailto:${inq.email}`}
                    className="bg-orange-600 text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-orange-700 transition"
                  >
                    Reply
                  </a>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
