import React, { useState, useEffect } from "react";
import CompanyLayout from "../../components/layout/companydashboard/CompanyLayout";
import { useDispatch, useSelector } from "react-redux";
import { companyConfiguresUpdate, companyConfiguresView } from "../../redux/slice/companySlice";
import { Save } from "lucide-react";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MODES = ["Paid Leave", "Short Leave", "Half Day", "Round Mark"];

function MonthlyLeaveConfigure() {
  const dispatch = useDispatch();
  const { companyConfigureViewData } = useSelector(
    (state) => state?.reducer?.company
  );

  const [form, setForm] = useState({
    weeklyOff: {
      count: 0,
      days: [],
      isPaid: true,
    },
    monthlyPolicy: {
      mode: "",
      paidLeaveDays: 0,
      paidLeaveDeduction: 0,
      shortLeaveCount: 0,
      shortLeaveEquivalent: 0.25,
      shortLeaveDeduction: 0,
      halfDayCount: 0,
      halfDayEquivalent: 0.5,
      halfDayDeduction: 0,
      roundMarkCount: 0,
      roundMarkMinutes: 15,
      roundMarkDeduction: 0,
    },
  });

  useEffect(() => {
    dispatch(companyConfiguresView());
  }, [dispatch]);

  useEffect(() => {
    if (companyConfigureViewData?.data?.holiday) {
      setForm(companyConfigureViewData.data.holiday);
    }
  }, [companyConfigureViewData]);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const toggleWeekDay = (day) => {
    setForm((prev) => ({
      ...prev,
      weeklyOff: {
        ...prev.weeklyOff,
        days: prev.weeklyOff.days.includes(day)
          ? prev.weeklyOff.days.filter((d) => d !== day)
          : [...prev.weeklyOff.days, day],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { holiday: form };
    await dispatch(companyConfiguresUpdate(payload));
    alert("Monthly leave config saved!");
  };

  return (
    <CompanyLayout>
      <div className="mx-auto max-w-4xl p-6 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Monthly Leave & Weekly Off Configuration
        </h2>

        {/* WEEKLY OFF */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Weekly Off</h3>

          <div className="flex gap-4">
            <label className="flex flex-col text-sm">
              Count
              <input
                type="number"
                value={form.weeklyOff.count}
                onChange={(e) =>
                  handleChange("weeklyOff", "count", +e.target.value)
                }
                className="input"
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.weeklyOff.isPaid}
                onChange={(e) =>
                  handleChange("weeklyOff", "isPaid", e.target.checked)
                }
              />
              Paid Weekly Off
            </label>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {WEEK_DAYS.map((day) => (
              <label
                key={day}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.weeklyOff.days.includes(day)}
                  onChange={() => toggleWeekDay(day)}
                  className="accent-blue-600"
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* MONTHLY POLICY */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Monthly Policy</h3>

          {/* MODE */}
          {/* <div>
            <label className="block text-sm">Mode</label>
            <select
              value={form.monthlyPolicy.mode}
              onChange={(e) =>
                handleChange("monthlyPolicy", "mode", e.target.value)
              }
              className="input"
            >
              <option value="">Select mode</option>
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div> */}

          {/* PAID LEAVE */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              Paid Leave Days
              <input
                type="number"
                value={form.monthlyPolicy.paidLeaveDays}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "paidLeaveDays",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
                <label className="flex flex-col text-sm">
              Un-Paid Leave Deduction
              <input
                type="number"
                value={form.monthlyPolicy.paidLeaveDeduction}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "paidLeaveDeduction",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
          </div>

          {/* SHORT LEAVE */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              Short Leave Count
              <input
                type="number"
                value={form.monthlyPolicy.shortLeaveCount}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "shortLeaveCount",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
            <label className="flex flex-col text-sm">
              Short Leave Equivalent
              <input
                type="number"
                step="0.01"
                value={form.monthlyPolicy.shortLeaveEquivalent}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "shortLeaveEquivalent",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
          </div>
          <label className="flex flex-col text-sm">
            Short Leave Deduction
            <input
              type="number"
              value={form.monthlyPolicy.shortLeaveDeduction}
              onChange={(e) =>
                handleChange(
                  "monthlyPolicy",
                  "shortLeaveDeduction",
                  +e.target.value
                )
              }
              className="input"
            />
          </label>

          {/* HALF DAY */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              Half Day Count
              <input
                type="number"
                value={form.monthlyPolicy.halfDayCount}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "halfDayCount",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
            <label className="flex flex-col text-sm">
              Half Day Equivalent
              <input
                type="number"
                step="0.1"
                value={form.monthlyPolicy.halfDayEquivalent}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "halfDayEquivalent",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
          </div>
          <label className="flex flex-col text-sm">
            Half Day Deduction
            <input
              type="number"
              value={form.monthlyPolicy.halfDayDeduction}
              onChange={(e) =>
                handleChange(
                  "monthlyPolicy",
                  "halfDayDeduction",
                  +e.target.value
                )
              }
              className="input"
            />
          </label>

          {/* ROUND MARK */}
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              Round Mark Count
              <input
                type="number"
                value={form.monthlyPolicy.roundMarkCount}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "roundMarkCount",
                    +e.target.value
                  )
                }
                classNumber="input"
              />
            </label>
            <label className="flex flex-col text-sm">
              Round Mark Minutes
              <input
                type="number"
                value={form.monthlyPolicy.roundMarkMinutes}
                onChange={(e) =>
                  handleChange(
                    "monthlyPolicy",
                    "roundMarkMinutes",
                    +e.target.value
                  )
                }
                className="input"
              />
            </label>
          </div>
          <label className="flex flex-col text-sm">
            Round Mark Deduction
            <input
              type="number"
              value={form.monthlyPolicy.roundMarkDeduction}
              onChange={(e) =>
                handleChange(
                  "monthlyPolicy",
                  "roundMarkDeduction",
                  +e.target.value
                )
              }
              className="input"
            />
          </label>
        </div>

        {/* SAVE BUTTON */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
        }
      `}</style>
    </CompanyLayout>
  );
}

export default MonthlyLeaveConfigure;
