"use client";

import last from "lodash.last";
import capitalize from "lodash.capitalize";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Breadcrumb } from "@/lib/types";

const getCrumbs = (pathname: string) => {
  const pathList = pathname.slice(1).split("/");

  return pathList.reduce((acc: Breadcrumb[], crumb) => {
    const path = [last(acc)?.path, `/${crumb}`].join("");

    acc = [...acc, { path, value: crumb }];
    return acc;
  }, []);
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  const crumbs = getCrumbs(pathname).slice(0, -1);

  return (
    <div className="text-stone-600" data-testid="breadcrumbs-component">
      {crumbs.map((crumb: Breadcrumb, i) => {
        return (
          <span key={crumb.path}>
            <Link href={crumb.path}>{capitalize(crumb.value)}</Link>
            {crumbs.length !== i + 1 ? <span className="mx-1">/</span> : ""}
          </span>
        );
      })}
    </div>
  );
}
