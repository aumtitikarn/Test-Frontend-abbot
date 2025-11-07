"use client";

type Props = {
  title?: string;
  data?: number[]; // 0–100
  labels?: string[];
};

export default function BarSpark({
  title = "ยอดเข้าใช้งานต่อวัน",
  data = [32, 55, 41, 70, 62, 88, 45],
  labels = ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
}: Props) {
  const max = 100;

  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          Mock
        </span>
      </div>

      {/* กราฟแท่ง */}
      <div className="flex items-end justify-between gap-2 h-40">
        {data.map((v, i) => (
          <div key={i} className="flex w-full flex-col items-center gap-2">
            <div
              className="w-full rounded-md bg-primary/20"
              style={{ height: "100%" }}
            >
              <div
                className="h-full w-full origin-bottom rounded-md bg-primary transition-all duration-700"
                style={{
                  height: `${Math.max(0, Math.min(v, max))}%`,
                }}
              />
            </div>
            <span className="select-none text-[11px] text-gray-500">
              {labels[i] ?? ""}
            </span>
          </div>
        ))}
      </div>

      {/* ตัวเลขสรุป */}
      <div className="mt-4 flex items-center gap-3 text-sm">
        <span className="font-semibold text-gray-900">
          {data.reduce((a, b) => a + b, 0)}
        </span>
        <span className="text-gray-500">รวมสัปดาห์นี้</span>
        <span className="ml-auto rounded-md bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
          +12.4%
        </span>
      </div>
    </div>
  );
}
