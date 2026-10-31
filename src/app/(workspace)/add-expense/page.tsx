"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Checkbox, FormControlLabel, MenuItem, Stack, Typography } from "@mui/material";

import { useAppSelector } from "@/lib/store/hooks";
import { circles, getCircle, getMember } from "@/lib/domain/mock-data";
import { splitByPercentage, splitByShares, splitEqual, splitExact } from "@/lib/split/calculateSplit";
import type { SplitMode } from "@/lib/domain/types";
import { ActionButton } from "@/components/common/ActionButton";
import { FormField } from "@/components/common/FormField";
import { PageHeader } from "@/components/common/PageHeader";
import { SoftCard } from "@/components/common/SoftCard";
import { SplitModeTabs } from "@/components/expenses/SplitModeTabs";
import { AllocationPreview } from "@/components/expenses/AllocationPreview";

const CATEGORIES = ["Food & dining", "Transport", "Entertainment", "Groceries", "Other"];

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  payerId: z.string().min(1, "Choose who paid"),
  circleId: z.string().min(1, "Choose a circle"),
  category: z.string().min(1, "Choose a category"),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

function AddExpenseForm() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const searchParams = useSearchParams();
  const preselectedCircleId = searchParams.get("circle") ?? circles[0]?.id ?? "";

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      payerId: "you",
      circleId: preselectedCircleId,
      category: CATEGORIES[0],
    },
  });

  const [splitMode, setSplitMode] = useState<SplitMode>("equal");
  const [participantIds, setParticipantIds] = useState<string[]>(
    getCircle(preselectedCircleId)?.memberIds ?? [],
  );
  const [percentages, setPercentages] = useState<Record<string, string>>({});
  const [exactAmounts, setExactAmounts] = useState<Record<string, string>>({});
  const [shareCounts, setShareCounts] = useState<Record<string, string>>({});

  const circleId = watch("circleId");
  const amount = watch("amount");

  const circle = getCircle(circleId);
  const circleMembers = useMemo(
    () => (circle?.memberIds ?? []).map((id) => getMember(id)).filter((m): m is NonNullable<typeof m> => !!m),
    [circle],
  );
  const amountCents = Math.round((Number(amount) || 0) * 100);

  const result = useMemo(() => {
    switch (splitMode) {
      case "equal":
        return splitEqual(amountCents, participantIds);
      case "percentage":
        return splitByPercentage(
          amountCents,
          Object.fromEntries(participantIds.map((id) => [id, Number(percentages[id]) || 0])),
        );
      case "exact":
        return splitExact(
          amountCents,
          Object.fromEntries(participantIds.map((id) => [id, Math.round((Number(exactAmounts[id]) || 0) * 100)])),
        );
      case "shares":
        return splitByShares(
          amountCents,
          Object.fromEntries(participantIds.map((id) => [id, Number(shareCounts[id]) || 0])),
        );
    }
  }, [splitMode, amountCents, participantIds, percentages, exactAmounts, shareCounts]);

  function toggleParticipant(id: string) {
    setParticipantIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  }

  return (
    <Box>
      <PageHeader
        eyebrow="Guided split flow"
        title="Add a new expense"
        subtitle="Detail, payer, participants, allocation, review."
      />

      <Stack direction={{ xs: "column", md: "row" }} spacing="18px" sx={{ alignItems: "flex-start" }}>
        <SoftCard sx={{ flex: 1.4, width: "100%" }}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, mb: "16px" }}>Expense details</Typography>

          <Stack spacing="18px">
            <FormField
              label="Expense title"
              placeholder="Friday dinner at North Italia"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing="16px">
              <FormField
                label="Amount"
                type="number"
                slotProps={{ htmlInput: { step: "0.01", min: 0 } }}
                {...register("amount", { valueAsNumber: true })}
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
              <FormField label="Paid by" select defaultValue="you" {...register("payerId")}>
                {circleMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </FormField>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing="16px">
              <FormField
                label="Circle"
                select
                defaultValue={preselectedCircleId}
                {...register("circleId", {
                  onChange: (e) => setParticipantIds(getCircle(e.target.value)?.memberIds ?? []),
                })}
              >
                {circles.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </FormField>
              <FormField label="Category" select defaultValue={CATEGORIES[0]} {...register("category")}>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </FormField>
            </Stack>

            <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#74869D" }}>Participants</Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap" }}>
              {circleMembers.map((member) => (
                <FormControlLabel
                  key={member.id}
                  control={
                    <Checkbox
                      checked={participantIds.includes(member.id)}
                      onChange={() => toggleParticipant(member.id)}
                    />
                  }
                  label={member.name}
                  slotProps={{ typography: { sx: { fontSize: 13 } } }}
                />
              ))}
            </Stack>

            <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#74869D" }}>Split calculation</Typography>
            <SplitModeTabs value={splitMode} onChange={setSplitMode} />

            {splitMode === "percentage" && (
              <Stack spacing="12px">
                {circleMembers
                  .filter((m) => participantIds.includes(m.id))
                  .map((member) => (
                    <FormField
                      key={member.id}
                      label={`${member.name} %`}
                      type="number"
                      value={percentages[member.id] ?? ""}
                      onChange={(e) => setPercentages((prev) => ({ ...prev, [member.id]: e.target.value }))}
                    />
                  ))}
              </Stack>
            )}
            {splitMode === "exact" && (
              <Stack spacing="12px">
                {circleMembers
                  .filter((m) => participantIds.includes(m.id))
                  .map((member) => (
                    <FormField
                      key={member.id}
                      label={`${member.name} amount`}
                      type="number"
                      value={exactAmounts[member.id] ?? ""}
                      onChange={(e) => setExactAmounts((prev) => ({ ...prev, [member.id]: e.target.value }))}
                    />
                  ))}
              </Stack>
            )}
            {splitMode === "shares" && (
              <Stack spacing="12px">
                {circleMembers
                  .filter((m) => participantIds.includes(m.id))
                  .map((member) => (
                    <FormField
                      key={member.id}
                      label={`${member.name} shares`}
                      type="number"
                      value={shareCounts[member.id] ?? ""}
                      onChange={(e) => setShareCounts((prev) => ({ ...prev, [member.id]: e.target.value }))}
                    />
                  ))}
              </Stack>
            )}

            <ActionButton disabled={!result.valid} sx={{ alignSelf: "flex-start" }}>
              Review split
            </ActionButton>
          </Stack>
        </SoftCard>

        <Stack sx={{ flex: 1, width: "100%" }}>
          <AllocationPreview
            participants={circleMembers.filter((m) => participantIds.includes(m.id))}
            result={result}
            currency={currency}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default function AddExpensePage() {
  return (
    <Suspense fallback={null}>
      <AddExpenseForm />
    </Suspense>
  );
}
