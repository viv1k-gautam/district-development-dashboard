"""District Development Data Analytics Dashboard (demonstration build)."""

from __future__ import annotations

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st


st.set_page_config(
    page_title="DHDAD | District Health & Development Analytics",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

SECTORS = ["Health", "Education", "Agriculture", "Infrastructure", "Economy"]
PERIODS = ["2011", "2015-16", "2019-21"]
INDICATORS = [
    {"key": "institutional_delivery", "name": "Institutional delivery", "sector": "Health", "unit": "%", "direction": "higher", "source": "NFHS-5 District Factsheet (demo values)"},
    {"key": "immunization", "name": "Full immunization coverage", "sector": "Health", "unit": "%", "direction": "higher", "source": "NFHS-5 District Factsheet (demo values)"},
    {"key": "stunting", "name": "Child stunting (under 5)", "sector": "Health", "unit": "%", "direction": "lower", "source": "NFHS-5 District Factsheet (demo values)"},
    {"key": "maternal_anemia", "name": "Women with anaemia (15-49)", "sector": "Health", "unit": "%", "direction": "lower", "source": "NFHS-5 District Factsheet (demo values)"},
    {"key": "literacy", "name": "Literacy rate", "sector": "Education", "unit": "%", "direction": "higher", "source": "Census of India 2011 (demo values)"},
    {"key": "school_enrolment", "name": "School enrolment", "sector": "Education", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "teacher_ratio", "name": "Pupil-teacher ratio", "sector": "Education", "unit": "students/teacher", "direction": "lower", "source": "Illustrative project data"},
    {"key": "irrigated_area", "name": "Net irrigated area", "sector": "Agriculture", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "farmer_coverage", "name": "Farmer scheme coverage", "sector": "Agriculture", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "road_connectivity", "name": "Rural road connectivity", "sector": "Infrastructure", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "tap_water", "name": "Households with tap water", "sector": "Infrastructure", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "electricity", "name": "Household electrification", "sector": "Infrastructure", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
    {"key": "worker_participation", "name": "Worker participation", "sector": "Economy", "unit": "%", "direction": "higher", "source": "Census of India 2011 (demo values)"},
    {"key": "bank_access", "name": "Households with banking access", "sector": "Economy", "unit": "%", "direction": "higher", "source": "Illustrative project data"},
]
DISTRICT_ROWS = [
    ("Jaunpur", "Uttar Pradesh", "DEMO-UP-001", [78.2, 62.5, 32.7, 54.1, 73.4, 86, 32, 48, 68, 71, 82, 93, 58.4, 79], 4.41, 4038),
    ("Varanasi", "Uttar Pradesh", "DEMO-UP-002", [86.4, 68.3, 28.1, 49.6, 75.6, 91, 29, 54, 82, 77, 76, 96, 60.2, 86], 3.69, 1535),
    ("Lucknow", "Uttar Pradesh", "DEMO-UP-003", [89.1, 72.4, 25.2, 48.3, 79.8, 94, 26, 42, 75, 89, 84, 98, 62.8, 92], 4.59, 2528),
    ("Gorakhpur", "Uttar Pradesh", "DEMO-UP-004", [80.4, 64.2, 31.4, 53.7, 69.2, 83, 35, 51, 71, 70, 73, 91, 55.1, 77], 44.4, 3483),
    ("Prayagraj", "Uttar Pradesh", "DEMO-UP-005", [82.1, 66.1, 29.8, 56.3, 72.4, 88, 31, 47, 74, 74, 79, 94, 59.6, 83], 5.95, 5482),
    ("Agra", "Uttar Pradesh", "DEMO-UP-006", [84.7, 69.1, 27.5, 51.4, 71.8, 89, 30, 39, 65, 86, 79, 97, 63.3, 90], 4.42, 4041),
]


@st.cache_data
def build_data() -> tuple[pd.DataFrame, pd.DataFrame]:
    records = []
    for name, state, code, values, population, area in DISTRICT_ROWS:
        record = {"District": name, "State": state, "District code": code,
                  "Population (lakh)": population, "Area (km²)": area}
        record.update({indicator["key"]: value for indicator, value in zip(INDICATORS, values)})
        records.append(record)
    data = pd.DataFrame(records)
    catalog = pd.DataFrame(INDICATORS)
    normalized_columns = {}
    for indicator in INDICATORS:
        key = indicator["key"]
        minimum, maximum = data[key].min(), data[key].max()
        normalized = ((data[key] - minimum) / (maximum - minimum) * 100) if maximum != minimum else 50
        if indicator["direction"] == "lower":
            normalized = 100 - normalized
        normalized_columns[key] = normalized.clip(0, 100)
    scores = pd.DataFrame(normalized_columns)
    for sector in SECTORS:
        keys = catalog.loc[catalog["sector"] == sector, "key"].tolist()
        data[f"{sector} score"] = scores[keys].mean(axis=1)
    data["DHDI score"] = data[[f"{sector} score" for sector in SECTORS]].mean(axis=1)
    data["State rank"] = data["DHDI score"].rank(method="min", ascending=False).astype(int)
    return data, catalog


DATA, CATALOG = build_data()
COLORS = ["#155eef", "#22a06b", "#f79009", "#875bf7", "#e5484d"]
st.markdown("""
<style>
  .stApp { background: #f4f8ff; }
  [data-testid="stSidebar"] { background: linear-gradient(180deg,#071b36,#0a2b54); }
  [data-testid="stSidebar"] * { color: #f5f8ff; }
  .hero { padding: 1.2rem 1.5rem; border-radius: 18px; color:white;
    background: linear-gradient(110deg,#082f74,#1768d4 65%,#39a3e7); margin-bottom:1rem; }
  .hero h1 { margin:0; color:white; font-size:2.2rem; }
  .hero p { margin:.3rem 0 0; color:#e3efff; }
  .notice { padding:.8rem 1rem; border-left:4px solid #f79009; border-radius:8px;
    background:#fff7e7; color:#604100; margin:.5rem 0 1rem; }
  div[data-testid="stMetric"] { background:white; border:1px solid #deebfb;
    border-radius:12px; padding:14px 16px; }
  .small-muted { color:#526581; font-size:.9rem; }
</style>
""", unsafe_allow_html=True)


def district_row(name: str) -> pd.Series:
    return DATA.loc[DATA["District"] == name].iloc[0]


def show_header(subtitle: str) -> None:
    st.markdown(f'<div class="hero"><h1>District Development Analytics</h1><p>{subtitle}</p></div>', unsafe_allow_html=True)
    st.markdown('<div class="notice"><b>Demonstration data:</b> district values and scores are illustrative, not verified official statistics. Do not use for policy decisions.</div>', unsafe_allow_html=True)


def band(score: float) -> str:
    return "Strong" if score >= 60 else "Moderate" if score >= 45 else "Lower"


with st.sidebar:
    st.markdown("## 🩺 DHDAD")
    st.caption("District Health & Development Analytics Dashboard")
    page = st.radio("Navigate", ["Overview", "Compare Districts", "Health Indicators", "Rankings", "Data & Methodology"], label_visibility="collapsed")
    st.divider()
    st.caption("Healthy people, healthier districts, a stronger India.")
    st.caption("Prototype • Uttar Pradesh • NFHS/Census reference periods")


if page == "Overview":
    show_header("Explore district performance across health, education, agriculture, infrastructure, and economy.")
    selected = st.selectbox("Select district", DATA["District"].tolist(), index=0)
    row = district_row(selected)
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Composite DHDI", f'{row["DHDI score"]:.1f} / 100', band(row["DHDI score"]))
    c2.metric("Uttar Pradesh rank", f'{row["State rank"]} / {len(DATA)}')
    c3.metric("Population (illustrative)", f'{row["Population (lakh)"]:g} lakh')
    c4.metric("Area", f'{row["Area (km²)"]:,} km²')
    left, right = st.columns([1.05, 1])
    with left:
        st.subheader(f"{selected} — category scores")
        scores = pd.DataFrame({"Category": SECTORS, "Score": [row[f"{s} score"] for s in SECTORS]})
        chart = px.bar(scores, x="Score", y="Category", orientation="h", color="Category", color_discrete_sequence=COLORS, range_x=[0, 100], text=scores["Score"].map(lambda n: f"{n:.1f}"))
        chart.update_layout(showlegend=False, height=330, margin=dict(l=8, r=8, t=10, b=10), paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(chart, use_container_width=True)
    with right:
        st.subheader("District comparison")
        subset = DATA.sort_values("DHDI score", ascending=False)
        chart = px.bar(subset, x="District", y="DHDI score", color="District", color_discrete_sequence=COLORS, text=subset["DHDI score"].map(lambda n: f"{n:.1f}"))
        chart.update_layout(showlegend=False, height=330, yaxis_range=[0, 100], margin=dict(l=8, r=8, t=10, b=10), paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(chart, use_container_width=True)
    best, weakest = max(SECTORS, key=lambda s: row[f"{s} score"]), min(SECTORS, key=lambda s: row[f"{s} score"])
    st.subheader("Key takeaways")
    st.info(f"{selected}'s strongest category is **{best}** ({row[f'{best} score']:.1f}); **{weakest}** ({row[f'{weakest} score']:.1f}) is its lowest-scoring category in this six-district demonstration peer set.")
    st.caption("Scores use peer-set min–max normalization and equal category weighting; rankings change when the comparison districts change.")

elif page == "Compare Districts":
    show_header("Compare indicator values and category scores across two Uttar Pradesh districts.")
    options = DATA["District"].tolist()
    col1, col2 = st.columns(2)
    d1 = col1.selectbox("District 1", options, index=0)
    d2 = col2.selectbox("District 2", options, index=1)
    first, second = district_row(d1), district_row(d2)
    m1, m2 = st.columns(2)
    m1.metric(f"{d1} composite score", f'{first["DHDI score"]:.1f} / 100', f'Rank {first["State rank"]}')
    m2.metric(f"{d2} composite score", f'{second["DHDI score"]:.1f} / 100', f'Rank {second["State rank"]}')
    category = pd.DataFrame({"Category": SECTORS, d1: [first[f"{s} score"] for s in SECTORS], d2: [second[f"{s} score"] for s in SECTORS]})
    st.subheader("Category performance")
    melted = category.melt(id_vars="Category", var_name="District", value_name="Score")
    fig = px.bar(melted, x="Category", y="Score", color="District", barmode="group", color_discrete_sequence=["#155eef", "#f04452"], range_y=[0, 100])
    fig.update_layout(height=360, paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)")
    st.plotly_chart(fig, use_container_width=True)
    st.subheader("Detailed indicator comparison")
    indicator_rows = []
    for item in INDICATORS:
        indicator_rows.append({"Sector": item["sector"], "Indicator": item["name"], "Unit": item["unit"], d1: first[item["key"]], d2: second[item["key"]], "Direction": "Higher is better" if item["direction"] == "higher" else "Lower is better"})
    st.dataframe(pd.DataFrame(indicator_rows), hide_index=True, use_container_width=True)

elif page == "Health Indicators":
    show_header("Browse indicator values by district, sector, and reference period.")
    col1, col2 = st.columns([1, 2])
    selected_sector = col1.selectbox("Sector", ["All sectors", *SECTORS])
    selected_district = col2.selectbox("District", ["All districts", *DATA["District"].tolist()])
    chosen = CATALOG if selected_sector == "All sectors" else CATALOG[CATALOG["sector"] == selected_sector]
    districts = DATA if selected_district == "All districts" else DATA[DATA["District"] == selected_district]
    long_rows = []
    for _, district in districts.iterrows():
        for _, indicator in chosen.iterrows():
            long_rows.append({"District": district["District"], "Sector": indicator["sector"], "Indicator": indicator["name"], "Value": district[indicator["key"]], "Unit": indicator["unit"], "Direction": "Higher is better" if indicator["direction"] == "higher" else "Lower is better", "Source note": indicator["source"]})
    table = pd.DataFrame(long_rows)
    st.dataframe(table, hide_index=True, use_container_width=True)
    st.download_button("Download indicator table (CSV)", table.to_csv(index=False).encode("utf-8"), "district_indicators_demo.csv", "text/csv")
    st.caption("Reference period labels are indicative only; several values are purely illustrative project data. See Data & Methodology for caveats.")

elif page == "Rankings":
    show_header("View the relative composite index and category rankings for the demonstration districts.")
    selected_sector = st.selectbox("Rank by", ["Overall DHDI", *SECTORS])
    score_column = "DHDI score" if selected_sector == "Overall DHDI" else f"{selected_sector} score"
    ranked = DATA.sort_values(score_column, ascending=False).reset_index(drop=True)
    ranked.insert(0, "Rank", range(1, len(ranked) + 1))
    ranked[score_column] = ranked[score_column].round(1)
    st.dataframe(ranked[["Rank", "District", score_column, "Population (lakh)", "District code"]], hide_index=True, use_container_width=True)
    fig = px.bar(ranked, x="District", y=score_column, color="District", color_discrete_sequence=COLORS, range_y=[0, 100], text=ranked[score_column].map(lambda n: f"{n:.1f}"))
    fig.update_layout(showlegend=False, height=370, paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)")
    st.plotly_chart(fig, use_container_width=True)

else:
    show_header("Review the indicator catalog, source notes, and composite-score method.")
    st.subheader("Composite Development Index")
    st.markdown("Indicators are min–max normalized across the six demonstration districts. Higher-is-better indicators use **(x − min) / (max − min) × 100**; lower-is-better indicators reverse the result. Indicators are averaged within each sector, and the five sector means receive equal weight in the composite.")
    st.warning("This is a peer-set-dependent prototype score, not an official District Development Index. All dashboard observations are illustrative demo data. Do not use these values for planning, evaluation, or policy decisions.")
    st.subheader("Indicator catalog and source status")
    st.dataframe(CATALOG.rename(columns={"key": "Field", "name": "Indicator", "sector": "Sector", "unit": "Unit", "direction": "Preferred direction", "source": "Source note"}), hide_index=True, use_container_width=True)
    st.subheader("CSV integration contract")
    st.code("district_code,district,state,year,sector,indicator,value,unit,source,published_at", language="text")
    st.markdown("A production data pipeline still needs source validation, district/LGD code reconciliation, boundary versioning, missing-value rules, outlier review, and auditable ingestion. Forecasting and official boundary map rendering are not implemented in this Streamlit prototype.")
    csv = DATA.to_csv(index=False).encode("utf-8")
    st.download_button("Download demonstration dataset (CSV)", csv, "district_demo_data.csv", "text/csv")

st.divider()
st.caption("DHDAD prototype • Uttar Pradesh • Observations are illustrative demonstration data • Verify and replace with authoritative sources before any real-world use.")
