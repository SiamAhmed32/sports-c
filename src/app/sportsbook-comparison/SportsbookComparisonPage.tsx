"use client";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  oddsGames,
  sportsbookMatchups,
  arbitrageOpportunities,
  valueProps,
  edgeChartData,
} from "@/data/mockData";
import { formatOdds } from "@/lib/utils";
import { TrendingUp, Star, Lock, ArrowRight } from "lucide-react";

const books = ["FanDuel", "DraftKings", "BetMGM"];
type Tab = "moneyline" | "spread" | "total";

export function SportsbookComparisonPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>("moneyline");
  const [selectedGame, setSelectedGame] = useState(0);
  const game = oddsGames[selectedGame];

  const getOutcome = (
    bookKey: string,
    marketKey: string,
    teamIndex: number,
  ) => {
    const bk = game.bookmakers.find((b) => b.key === bookKey);
    if (!bk) return null;
    const mkt = bk.markets.find((m) => m.key === marketKey);
    return mkt?.outcomes[teamIndex] ?? null;
  };

  const h2hPrices = books.map((b) => {
    const bk = game.bookmakers.find((bk) => bk.title === b);
    return bk?.markets.find((m) => m.key === "h2h")?.outcomes[0]?.price ?? null;
  });
  const bestML = Math.max(...h2hPrices.filter((p): p is number => p !== null));

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="font-display text-2xl md:text-3xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Sportsbook Comparison
          </h1>
          <p
            className="text-sm font-body mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Find the best odds and arbitrage opportunities across all books
          </p>
        </div>
      </div>

      {/* Game Selector */}
      <div className="flex gap-2 flex-wrap">
        {oddsGames.map((g, i) => (
          <button
            key={g.id}
            onClick={() => setSelectedGame(i)}
            className="px-4 py-2 rounded-lg text-sm font-body font-medium transition-all border"
            style={{
              backgroundColor:
                selectedGame === i ? "var(--emerald)" : "var(--bg-card)",
              color: selectedGame === i ? "white" : "var(--text-secondary)",
              borderColor:
                selectedGame === i ? "var(--emerald)" : "var(--border)",
            }}
          >
            {g.away_team.split(" ").pop()} @ {g.home_team.split(" ").pop()}
          </button>
        ))}
      </div>

      {/* Tab Bar */}
      <div
        className="flex gap-1 p-1 rounded-xl w-fit"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        {(["moneyline", "spread", "total"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className="px-5 py-2 rounded-lg text-sm font-body font-medium capitalize transition-all"
            style={{
              backgroundColor:
                selectedTab === tab ? "var(--bg-card)" : "transparent",
              color:
                selectedTab === tab
                  ? "var(--text-primary)"
                  : "var(--text-muted)",
              boxShadow: selectedTab === tab ? "var(--card-shadow)" : "none",
            }}
          >
            {tab === "moneyline"
              ? "Moneyline"
              : tab === "spread"
                ? "Spread"
                : "Totals"}
          </button>
        ))}
      </div>

      {/* Main Comparison Table */}
      <div className="card rounded-xl p-5">
        <h2
          className="font-display text-base font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          {game.away_team.split(" ").pop()} @ {game.home_team.split(" ").pop()}{" "}
          —{" "}
          {selectedTab === "moneyline"
            ? "Moneyline"
            : selectedTab === "spread"
              ? "Spread"
              : "Totals"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th
                  className="text-left py-3 px-4 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Sportsbook
                </th>
                <th
                  className="text-center py-3 px-4 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  {game.home_team.split(" ").slice(-1)[0]}
                </th>
                <th
                  className="text-center py-3 px-4 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  {game.away_team.split(" ").slice(-1)[0]}
                </th>
                {selectedTab !== "moneyline" && (
                  <th
                    className="text-center py-3 px-4 font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Line
                  </th>
                )}
                <th
                  className="text-center py-3 px-4 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Best
                </th>
              </tr>
            </thead>
            <tbody>
              {game.bookmakers.map((bk) => {
                const mktKey =
                  selectedTab === "moneyline"
                    ? "h2h"
                    : selectedTab === "spread"
                      ? "spreads"
                      : "totals";
                const mkt = bk.markets.find((m) => m.key === mktKey);
                const o0 = mkt?.outcomes[0];
                const o1 = mkt?.outcomes[1];
                const isBest0 =
                  o0 && selectedTab === "moneyline" && o0.price === bestML;

                return (
                  <tr
                    key={bk.key}
                    className="hover:opacity-80 transition-opacity"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: "var(--emerald)" }}
                        >
                          {bk.title.charAt(0)}
                        </div>
                        <span
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {bk.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="font-bold text-base"
                        style={{
                          color:
                            o0 && o0.price > 0
                              ? "var(--emerald)"
                              : "var(--coral)",
                        }}
                      >
                        {o0
                          ? selectedTab === "spread"
                            ? `${(o0.point ?? 0) > 0 ? "+" : ""}${o0.point ?? ""} (${formatOdds(o0.price)})`
                            : selectedTab === "total"
                              ? `O${o0.point ?? ""} (${formatOdds(o0.price)})`
                              : formatOdds(o0.price)
                          : "—"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="font-bold text-base"
                        style={{
                          color:
                            o1 && o1.price > 0
                              ? "var(--emerald)"
                              : "var(--coral)",
                        }}
                      >
                        {o1
                          ? selectedTab === "spread"
                            ? `${(o1.point ?? 0) > 0 ? "+" : ""}${o1.point ?? ""} (${formatOdds(o1.price)})`
                            : selectedTab === "total"
                              ? `U${o1.point ?? ""} (${formatOdds(o1.price)})`
                              : formatOdds(o1.price)
                          : "—"}
                      </span>
                    </td>
                    {selectedTab !== "moneyline" && (
                      <td
                        className="py-3 px-4 text-center text-xs font-body"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {o0?.point ?? "—"}
                      </td>
                    )}
                    <td className="py-3 px-4 text-center">
                      {isBest0 && (
                        <span
                          className="badge text-white text-[9px] px-2"
                          style={{ backgroundColor: "var(--gold)" }}
                        >
                          BEST
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Arbitrage Opportunities */}
        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3
              className="font-display text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Arbitrage Opportunities
            </h3>
            <span
              className="badge text-white text-[9px]"
              style={{ backgroundColor: "var(--coral)" }}
            >
              {arbitrageOpportunities.length} FOUND
            </span>
          </div>
          <div className="space-y-3">
            {arbitrageOpportunities.map((arb, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "var(--emerald-light)",
                  border: "1px solid var(--emerald)",
                }}
              >
                <div className="flex justify-between items-center">
                  <p
                    className="text-xs font-body font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {arb.matchup}
                  </p>
                  <span className="text-sm font-body font-bold text-profit">
                    {arb.arb}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span
                    className="text-[10px] font-body"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {arb.book}
                  </span>
                  <span
                    className="text-[10px] font-body"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {arb.line}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Props */}
        <div className="card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <h3
              className="font-display text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Best Value Props
            </h3>
            <Star className="h-4 w-4" style={{ color: "var(--gold)" }} />
          </div>
          <div className="space-y-3">
            {valueProps.map((vp, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className="text-xs font-body font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {vp.player}
                    </p>
                    <p
                      className="text-[10px] font-body mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {vp.prop}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-body font-bold text-profit">
                      {vp.odds}
                    </p>
                    <p
                      className="text-[10px] font-body"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {vp.book}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className="text-[10px] font-body px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--emerald-light)",
                      color: "var(--emerald)",
                    }}
                  >
                    Edge: {vp.edge}
                  </span>
                  <ArrowRight
                    className="h-3 w-3"
                    style={{ color: "var(--text-muted)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Chart */}
        <div className="card rounded-xl p-5">
          <h3
            className="font-display text-sm font-semibold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Model vs Market Edge
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={edgeChartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
            >
              <XAxis
                dataKey="pt"
                tick={{
                  fontSize: 10,
                  fill: "var(--text-muted)",
                  fontFamily: "Inter",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "var(--text-muted)",
                  fontFamily: "Inter",
                }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: "Inter",
                }}
              />
              <Bar
                dataKey="model"
                name="Model"
                fill="var(--emerald)"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="market"
                name="Market"
                fill="var(--intel-blue)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs font-body">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: "var(--emerald)" }}
              />{" "}
              Model
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm inline-block"
                style={{ backgroundColor: "var(--intel-blue)" }}
              />{" "}
              Market
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
