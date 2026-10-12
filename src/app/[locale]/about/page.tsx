"use client";

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const languages = [
  { locale: "en", label: "English" },
  { locale: "ru", label: "Русский" },
  { locale: "tj", label: "Точики" },
];

export default function About() {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="px-[40px] py-[40px] text-[20px]">
      <select className="mb-[20px] border-1 bg-[black] border-[white]" value={locale} onChange={(e) => handleChange(e.target.value)}>
        {languages.map((lang,ind) => (
          <option key={ind} value={lang.locale}>{lang.label}</option>
        ))}
      </select>

      <h1>{t("title")}</h1>

     
      <p>{t("text")}</p>
    </div>
  );
}
