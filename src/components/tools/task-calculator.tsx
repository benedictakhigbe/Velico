"use client";

import { useMemo, useState } from "react";
import { Calculator, Clock, ListChecks, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field, SelectField } from "@/components/ui/field";

const complexityMultipliers = {
  simple: 1,
  standard: 1.25,
  complex: 1.6,
} as const;

export function TaskCalculator() {
  const [tasks, setTasks] = useState(8);
  const [minutes, setMinutes] = useState(20);
  const [people, setPeople] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(2500);
  const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("standard");

  const result = useMemo(() => {
    const safeTasks = Math.max(tasks, 0);
    const safeMinutes = Math.max(minutes, 0);
    const safePeople = Math.max(people, 1);
    const safeRate = Math.max(hourlyRate, 0);
    const totalMinutes = safeTasks * safeMinutes * complexityMultipliers[complexity];
    const totalHours = totalMinutes / 60;
    const calendarHours = totalHours / safePeople;
    const estimatedCost = totalHours * safeRate;

    return {
      totalHours,
      calendarHours,
      estimatedCost,
      dailyCapacity: safePeople * 8,
      daysAtEightHours: calendarHours / 8,
    };
  }, [complexity, hourlyRate, minutes, people, tasks]);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Calculator className="size-5 text-[var(--brand-blue)]" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-[var(--heading)]">Estimate a task batch</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field
            label="Number of tasks"
            type="number"
            min={0}
            value={tasks}
            onChange={(event) => setTasks(Number(event.target.value))}
          />
          <Field
            label="Minutes per task"
            type="number"
            min={0}
            value={minutes}
            onChange={(event) => setMinutes(Number(event.target.value))}
          />
          <Field
            label="People available"
            type="number"
            min={1}
            value={people}
            onChange={(event) => setPeople(Number(event.target.value))}
          />
          <Field
            label="Hourly cost (NGN)"
            type="number"
            min={0}
            value={hourlyRate}
            onChange={(event) => setHourlyRate(Number(event.target.value))}
          />
          <div className="sm:col-span-2">
            <SelectField
              label="Task complexity"
              value={complexity}
              onChange={(event) => setComplexity(event.target.value as keyof typeof complexityMultipliers)}
            >
              <option value="simple">Simple</option>
              <option value="standard">Standard</option>
              <option value="complex">Complex</option>
            </SelectField>
          </div>
        </div>
      </Card>

      <Card className="logo-gradient p-5 text-white sm:p-6">
        <h2 className="text-xl font-semibold">Calculated workload</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "Total work",
              value: `${result.totalHours.toFixed(1)} hrs`,
              icon: Clock,
            },
            {
              label: "Calendar time",
              value: `${result.calendarHours.toFixed(1)} hrs`,
              icon: ListChecks,
            },
            {
              label: "Estimated cost",
              value: `NGN ${Math.round(result.estimatedCost).toLocaleString("en-NG")}`,
              icon: WalletCards,
            },
            {
              label: "Work days",
              value: `${result.daysAtEightHours.toFixed(1)} days`,
              icon: Calculator,
            },
          ].map((item) => (
            <div key={item.label} className="rounded-[8px] border border-white/20 bg-white/12 p-4">
              <item.icon className="size-5 text-white" aria-hidden="true" />
              <p className="mt-4 text-sm text-white/75">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-white/80">
          Capacity guide: this team can handle about {result.dailyCapacity.toFixed(0)} focused task
          hours per 8-hour workday before breaks, meetings, and review time.
        </p>
      </Card>
    </div>
  );
}
