"use client";

import {
  Badge,
  Card,
  CardContent,
  Input,
  Spinner,
} from "@alocare/design-system";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocale } from "@/hooks/use-locale";
import { getPatients } from "@/lib/api/patients";

export default function PatientsPage() {
  const { locale } = useLocale();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const filtered = useMemo(() => {
    const items = data?.items ?? [];
    return items.filter((p) => {
      const matchesSearch =
        !search ||
        p.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (p.mrn?.toLowerCase().includes(search.toLowerCase()) ?? false);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "alerts" && Boolean(p.medical_alerts));
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900">
            {locale === "id" ? "Pasien" : "Patients"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "id"
              ? "Cari dan kelola daftar pasien"
              : "Search and manage your patient list"}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="min-w-[200px] flex-1">
            <Input
              lang={locale}
              placeholder={
                locale === "id" ? "Cari nama atau MRN…" : "Search name or MRN…"
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="all">
              {locale === "id" ? "Semua" : "All"}
            </option>
            <option value="alerts">
              {locale === "id" ? "Dengan peringatan" : "With alerts"}
            </option>
          </select>
        </div>

        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((patient) => (
              <Link key={patient.id} href={`/patients/${patient.id}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {patient.full_name}
                        </p>
                        {patient.mrn ? (
                          <p className="text-xs text-slate-500">
                            MRN: {patient.mrn}
                          </p>
                        ) : null}
                      </div>
                      {patient.medical_alerts ? (
                        <Badge variant="low">
                          {locale === "id" ? "Peringatan" : "Alert"}
                        </Badge>
                      ) : (
                        <Badge variant="normal">
                          {locale === "id" ? "Stabil" : "Stable"}
                        </Badge>
                      )}
                    </div>
                    {patient.allergies ? (
                      <p className="mt-3 text-xs text-slate-600">
                        {locale === "id" ? "Alergi" : "Allergies"}:{" "}
                        {patient.allergies}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 ? (
          <p className="text-sm text-slate-500">
            {locale === "id" ? "Tidak ada pasien ditemukan." : "No patients found."}
          </p>
        ) : null}
      </div>
    </AppShell>
  );
}
