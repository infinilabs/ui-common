import React from "react";
import { Breadcrumb, Tag, Progress } from "antd";
import * as LucideIcons from "lucide-react";
import { ExternalLink, Tags } from "lucide-react";

import type { PhysicalCardData } from "./types";

import styles from "./PhysicalCard.module.css";

const getLucideIcon = (name?: string) => {
  if (!name) return null;
  const raw = name.trim();
  const alias: Record<string, string> = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag",
  };
  const mapped = alias[raw];
  const pascal =
    mapped ?? raw.replace(/(^\w|-\w)/g, (s) => s.replace("-", "").toUpperCase());
  const IconComp = (LucideIcons as any)[pascal];
  return IconComp || null;
};

const renderPercentBar = (val: any, payload?: any) => {
  const num =
    typeof val === "number"
      ? val
      : typeof val === "string"
      ? parseFloat(val)
      : NaN;
  const pct = isFinite(num)
    ? num <= 1
      ? Math.max(0, Math.min(1, num)) * 100
      : Math.max(0, Math.min(100, num))
    : 0;

  return (
    <div className={styles.pcProgress}>
      <Progress
        percent={pct}
        showInfo={false}
        strokeColor="#027ffe"
        size={{ height: 12 }}
      />
      {payload?.text && (
        <div className={styles.pcProgressText}>{payload.text}</div>
      )}
    </div>
  );
};

const renderTags = (vals: any[]) => {
  if (!Array.isArray(vals) || vals.length === 0) return null;
  return (
    <div className={styles.pcTagsRow}>
      {vals.map((t, i) => (
        <Tag
          key={`${t}-${i}`}
          color="default"
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "none",
            backgroundColor: "#E8E8E8",
            color: "#027FFE",
          }}
        >
          {String(t)}
        </Tag>
      ))}
    </div>
  );
};

const renderColumnValue = (col: {
  label?: string;
  value?: any;
  view?: string;
  payload?: any;
}) => {
  const { view, value, payload } = col;
  if (view === "percent_bar") return renderPercentBar(value, payload);
  if (view === "tags") return renderTags(Array.isArray(value) ? value : []);
  return <div className={styles.pcColValue}>{String(value ?? "")}</div>;
};

export const PhysicalCardContent: React.FC<{ data?: PhysicalCardData }> = ({
  data: card,
}) => {
  return (
    <div
      className={styles.physicalCard}
      style={{
        width: card?.style?.width,
        height: card?.style?.height,
        maxWidth: card?.style?.max_width,
        maxHeight: card?.style?.max_height,
      }}
    >
      {card?.cover && (
        <div
          className={styles.pcCover}
          style={{ height: card?.style?.cover_max_height }}
        >
          <img src={card.cover} alt="cover" />
        </div>
      )}

      {Array.isArray(card?.categories) && card.categories.length > 0 && (
        <div className={styles.pcSection}>
          <Breadcrumb
            items={card.categories.map((c, idx) => ({
              key: `${c}-${idx}`,
              title: c,
            }))}
            separator={<span className={styles.pcBreadcrumbSep}>/</span>}
          />
        </div>
      )}

      {(card?.color ||
        card?.icon ||
        card?.title ||
        card?.subtitle ||
        card?.url) && (
        <div className={styles.pcBasic}>
          <div className={styles.pcBasicRow}>
            <div className={styles.pcBasicRowLeft}>
              {card?.color && (
                <span
                  className={styles.pcColorSwatch}
                  style={{ backgroundColor: card.color }}
                  aria-label={`color ${card.color}`}
                  title={`color: ${card.color}`}
                />
              )}

              {(() => {
                const rawIcon = card?.icon?.trim();
                if (rawIcon && /^https?:\/\/+/i.test(rawIcon)) {
                  return (
                    <img
                      src={rawIcon}
                      alt="icon"
                      className={styles.pcIcon}
                      width={18}
                      height={18}
                      style={{ objectFit: "contain" }}
                    />
                  );
                }
                const IconComp = getLucideIcon(rawIcon);
                return IconComp ? (
                  <IconComp className={styles.pcIcon} size={18} strokeWidth={2} />
                ) : null;
              })()}

              {card?.title && (
                <span className={styles.pcTitleText} title={card.title}>
                  {card.title}
                </span>
              )}

              {card?.subtitle && (
                <span className={styles.pcSubTitleText} title={card.subtitle}>
                  ｜ {card.subtitle}
                </span>
              )}
            </div>

            {card?.url && (
              <a
                href={card.url}
                target="_blank"
                rel="noreferrer"
                aria-label="open link"
                title={card.url}
                className={styles.pcLinkIconRight}
              >
                <ExternalLink
                  style={{ width: 12, height: 12, color: "#027FFE" }}
                />
              </a>
            )}
          </div>
        </div>
      )}

      {Array.isArray(card?.properties) && card.properties.length > 0 && (
        <div className={styles.pcSection}>
          <div className={styles.pcProperties}>
            {card.properties.map((p, idx) => {
              const IconComp = getLucideIcon(p.icon);
              const renderValue = () => {
                if (p.view === "tags") {
                  return renderTags(Array.isArray(p.value) ? p.value : []);
                }
                if (p.view === "datetime_with_time_zone") {
                  const v = String(p.value ?? "");
                  return <span className={styles.pcPropertyValue}>{v}</span>;
                }
                return (
                  <span className={styles.pcPropertyValue}>
                    {String(p.value ?? "")}
                  </span>
                );
              };
              return (
                <div key={idx} className={styles.pcProperty}>
                  {IconComp && (
                    <IconComp
                      className={styles.pcPropertyIcon}
                      size={16}
                      strokeWidth={2}
                    />
                  )}
                  {renderValue()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {Array.isArray(card?.details?.table?.rows) &&
        card.details!.table!.rows!.length > 0 && (
          <div className={styles.pcSection}>
            <div className={styles.pcDetails}>
              {card.details!.table!.rows!.map((row, rIdx) => {
                const columns = Array.isArray(row.columns)
                  ? row.columns.filter(
                      (c) => c && (c.label !== undefined || c.value !== undefined)
                    )
                  : [];
                const colCount = columns.length;
                return (
                  <div
                    className={styles.pcRow}
                    key={rIdx}
                    style={{
                      gridTemplateColumns:
                        colCount <= 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
                    }}
                  >
                    {columns.map((col, cIdx) => (
                      <div className={styles.pcCol} key={cIdx}>
                        {renderColumnValue(col)}
                        {col.label && (
                          <div className={styles.pcColLabel}>{col.label}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {Array.isArray(card?.tags) && card.tags.length > 0 && (
        <div className={styles.pcSection}>
          {card.tags.map((t, i) => (
            <Tag
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "#027FFE",
                border: "none",
              }}
              icon={<Tags style={{ width: 12, height: 12 }} />}
              color="default"
            >
              {t}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};