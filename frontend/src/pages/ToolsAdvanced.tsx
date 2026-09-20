import { useMemo, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Download, Fuel, Gauge, RotateCcw, Save, ShieldCheck, SlidersHorizontal, Sparkles, Trash2 } from "@/lib/lucide-react";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

const vehicles = [
  { id: "tenere", name: "Yamaha Ténéré 700", type: "DUAL-SPORT ADVENTURE", engine: "689cc CP2 Parallel-Twin (72.4 hp)", weight: "205 kg (wet)", price: "$10,799 USD", rating: "8.7 / 10", economy: "23.8 km/L" },
  { id: "cfmoto", name: "CFMoto 450 MT", type: "LIGHTWEIGHT MID-ADVENTURE", engine: "449cc 270° Parallel-Twin (44 hp)", weight: "190 kg (wet)", price: "$6,499 USD", rating: "9.2 / 10", economy: "26.5 km/L" },
  { id: "miata", name: "Mazda MX-5 Miata ND3", type: "LIGHTWEIGHT SPORTS ROADSTER", engine: "2.0L Skyactiv-G 4-Cyl (181 hp)", weight: "1,061 kg", price: "$28,985 USD", rating: "8.1 / 10", economy: "14.5 km/L" },
];

type Finish = "Gloss" | "Satin" | "Metallic";
type Graphic = "None" | "Center" | "Offset" | "Double GT";
type SavedBuild = { id: number; name: string; body: string; finish: Finish; wheels: string; graphic: Graphic; masked: boolean };

function ToolsHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description: string; id: string }) {
  return <div className="section-heading" data-testid={`${id}-heading-group`}><div className="section-heading-copy"><span className="eyebrow" data-testid={`${id}-eyebrow`}>{eyebrow}</span><h2 data-testid={`${id}-title`}>{title}</h2></div><p data-testid={`${id}-description`}>{description}</p></div>;
}

const colorName = (color: string) => color === "#FF6600" ? "ORANGE SAFETY" : color === "#CCCCCC" ? "STEEL SILVER" : color === "#F8F8F8" ? "OFF WHITE" : "ASPHALT BLACK";

export default function ToolsAdvanced() {
  const [trackMode, setTrackMode] = useState(true);
  const [vehicleA, setVehicleA] = useState("tenere");
  const [vehicleB, setVehicleB] = useState("cfmoto");
  const [showCompare, setShowCompare] = useState(false);
  const [dailyKm, setDailyKm] = useState("45");
  const [efficiency, setEfficiency] = useState("14.5");
  const [tax, setTax] = useState("320");
  const [bodyColor, setBodyColor] = useState("#FF6600");
  const [finish, setFinish] = useState<Finish>("Gloss");
  const [wheelColor, setWheelColor] = useState("#1A1A1A");
  const [graphic, setGraphic] = useState<Graphic>("None");
  const [mask, setMask] = useState(false);
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
  const selectedVehicles = [vehicles.find((vehicle) => vehicle.id === vehicleA) ?? vehicles[0], vehicles.find((vehicle) => vehicle.id === vehicleB) ?? vehicles[1]];
  const monthlyCost = useMemo(() => ((Number(dailyKm) || 0) * 30.5 / (Number(efficiency) || 1)) * 1.75 + (Number(tax) || 0) / 12, [dailyKm, efficiency, tax]);
  const vehicleStyle = { "--body-color": bodyColor, "--wheel-color": wheelColor } as CSSProperties;

  const saveBuild = () => {
    setSavedBuilds((builds) => [...builds, { id: Date.now(), name: `BUILD ${String(builds.length + 1).padStart(2, "0")}`, body: bodyColor, finish, wheels: wheelColor, graphic, masked: mask }]);
  };

  const loadBuild = (build: SavedBuild) => {
    setBodyColor(build.body); setFinish(build.finish); setWheelColor(build.wheels); setGraphic(build.graphic); setMask(build.masked);
  };

  const resetBuild = () => {
    setBodyColor("#FF6600"); setFinish("Gloss"); setWheelColor("#1A1A1A"); setGraphic("None"); setMask(false);
  };

  const downloadBuildCard = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><rect width="1200" height="675" fill="#1A1A1A"/><rect x="55" y="55" width="1090" height="565" fill="none" stroke="#FF6600" stroke-width="3"/><text x="90" y="115" fill="#FF6600" font-family="sans-serif" font-size="25" font-weight="700">DAILY DRIVER // LIVERY BUILD CARD</text><text x="90" y="190" fill="#F8F8F8" font-family="sans-serif" font-size="58" font-weight="800">CUSTOM SPEC 01</text><path d="M250 395 Q330 270 520 270 L760 270 Q875 285 955 395 L1000 440 L190 440 Z" fill="${bodyColor}" stroke="#F8F8F8" stroke-width="7"/><circle cx="350" cy="445" r="67" fill="${wheelColor}" stroke="#F8F8F8" stroke-width="12"/><circle cx="845" cy="445" r="67" fill="${wheelColor}" stroke="#F8F8F8" stroke-width="12"/><text x="90" y="565" fill="#CCCCCC" font-family="sans-serif" font-size="22">BODY ${colorName(bodyColor)}  //  ${finish.toUpperCase()}  //  WHEELS ${colorName(wheelColor)}  //  ${graphic.toUpperCase()} GRAPHIC  //  GLASS ${mask ? "MASKED" : "CLEAR"}</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "daily-driver-livery-build.svg";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div className={`daily-driver-app tools-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="tools-page">
      <MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} />
      <main className="tools-main" data-testid="tools-main">
        <div className="tools-intro"><span className="eyebrow" data-testid="tools-eyebrow">DAILY DRIVER // INSTRUMENTS</span><h1 data-testid="tools-title">THE TOOLS<br /><em>BEHIND THE DRIVE.</em></h1><p data-testid="tools-description">Compare the fleet, price the commute, and build a fully specified livery with garage-grade controls.</p></div>

        <section className="interactive-section tools-section" id="garage" data-testid="tools-garage-section">
          <ToolsHeading id="tools-garage" eyebrow="01 // THE GARAGE" title="SPEC SHEET COMPARISON" description="Select two machines from the fleet to compare daily livability, engine character, and real-world commuter ratings." />
          <div className="garage-layout"><div className="garage-controls" data-testid="tools-garage-controls"><div className="control-field"><label htmlFor="tools-vehicle-a" data-testid="tools-vehicle-a-label">VEHICLE A</label><div className="select-wrap"><select id="tools-vehicle-a" value={vehicleA} onChange={(event) => setVehicleA(event.target.value)} data-testid="tools-vehicle-a-select">{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.name}</option>)}</select><ChevronDown size={16} /></div></div><div className="control-field"><label htmlFor="tools-vehicle-b" data-testid="tools-vehicle-b-label">VEHICLE B</label><div className="select-wrap"><select id="tools-vehicle-b" value={vehicleB} onChange={(event) => setVehicleB(event.target.value)} data-testid="tools-vehicle-b-select">{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.name}</option>)}</select><ChevronDown size={16} /></div></div><Button className="outline-button" onClick={() => setShowCompare((show) => !show)} data-testid="tools-compare-button">{showCompare ? "HIDE COMPARISON" : "COMPARE MACHINES"}<SlidersHorizontal size={16} /></Button><div className="garage-note" data-testid="tools-garage-note"><ShieldCheck size={16} /><span>Specs verified by the Daily Driver test bench.</span></div></div>
            {showCompare && <div className="comparison-sheet" data-testid="tools-comparison-sheet"><div className="comparison-head"><span className="eyebrow" data-testid="tools-comparison-label">LIVE COMPARISON</span></div><div className="vehicle-columns">{selectedVehicles.map((vehicle, index) => <div className="vehicle-column" key={vehicle.id} data-testid={`tools-vehicle-${index === 0 ? "a" : "b"}-column`}><div className="vehicle-column-title"><span>{vehicle.type}</span><h3 data-testid={`tools-vehicle-${index === 0 ? "a" : "b"}-name`}>{vehicle.name}</h3></div>{[["ENGINE", vehicle.engine], ["WEIGHT", vehicle.weight], ["PRICE", vehicle.price], ["COMMUTE RATING", vehicle.rating]].map(([label, value]) => <div className="spec-cell" key={label}><span className="spec-label">{label}</span><strong>{value}</strong></div>)}<div className="mini-spec-row"><span>ECONOMY</span><strong>{vehicle.economy}</strong></div></div>)}</div></div>}
          </div>
        </section>

        <section className="interactive-section tools-section" id="ownership" data-testid="tools-ownership-section">
          <ToolsHeading id="tools-ownership" eyebrow="02 // RUNNING METRICS" title="COST OF OWNERSHIP" description="Calculate the true monthly cost of the route you actually drive, using the $1.75/L benchmark." />
          <div className="ownership-panel"><div className="ownership-fields" data-testid="tools-calculator-form"><div className="control-field"><label htmlFor="tools-daily-km">DAILY COMMUTE <span>(KM)</span></label><Input id="tools-daily-km" type="number" value={dailyKm} onChange={(event) => setDailyKm(event.target.value)} data-testid="tools-daily-km-input" /></div><div className="control-field"><label htmlFor="tools-efficiency">FUEL EFFICIENCY <span>(KM/L)</span></label><Input id="tools-efficiency" type="number" value={efficiency} onChange={(event) => setEfficiency(event.target.value)} data-testid="tools-efficiency-input" /></div><div className="control-field"><label htmlFor="tools-tax">ANNUAL TAX</label><Input id="tools-tax" type="number" value={tax} onChange={(event) => setTax(event.target.value)} data-testid="tools-tax-input" /></div><p className="fuel-note" data-testid="tools-fuel-note"><Fuel size={15} /> Benchmark fuel price: <strong>$1.75 / L</strong></p></div><div className="cost-output" data-testid="tools-monthly-cost"><span>MONTHLY RUNNING COST</span><strong data-testid="tools-monthly-cost-value">${monthlyCost.toFixed(2)}</strong><small>EST. USD // 30.5 DAYS</small></div></div>
        </section>

        <section className="interactive-section tools-section advanced-livery-section" id="livery" data-testid="tools-livery-section">
          <ToolsHeading id="tools-livery" eyebrow="03 // ADVANCED PAINT BOOTH" title="LIVERY VISUALIZER PRO" description="Build a complete exterior specification with body finish, wheel treatment, graphic package, glass masking, saved builds, and an exportable spec card." />
          <div className="advanced-livery-layout">
            <div className="advanced-livery-stage" data-testid="tools-livery-preview"><div className="preview-grid" /><span className="preview-label" data-testid="tools-livery-preview-label">DAILY DRIVER // CONFIGURATOR BAY 03</span><div className="vehicle-stage-shadow" /><div className={`vehicle-silhouette advanced-vehicle finish-${finish.toLowerCase()}`} style={vehicleStyle} data-testid="tools-vehicle-silhouette"><div className={`vehicle-stripe stripe-${graphic.toLowerCase().replaceAll(" ", "-")}`} data-testid="tools-vehicle-graphic" /><div className={`vehicle-windshield ${mask ? "masked" : ""}`} data-testid="tools-vehicle-windshield">{mask && <span>MASKED</span>}</div><div className="vehicle-roof" /><div className="vehicle-cabin" /><div className="vehicle-wheel wheel-one"><span /></div><div className="vehicle-wheel wheel-two"><span /></div></div><div className="stage-telemetry" data-testid="tools-stage-telemetry"><span>BODY <strong>{colorName(bodyColor)}</strong></span><span>FINISH <strong>{finish.toUpperCase()}</strong></span><span>GRAPHIC <strong>{graphic.toUpperCase()}</strong></span></div></div>
            <div className="advanced-livery-controls" data-testid="tools-livery-controls">
              <div className="config-control"><span className="control-title" data-testid="tools-body-color-label">01 // BODY COLOR</span><div className="swatch-row">{[["#1A1A1A", "ASPHALT BLACK"], ["#FF6600", "ORANGE SAFETY"], ["#CCCCCC", "STEEL SILVER"], ["#F8F8F8", "OFF WHITE"]].map(([color, label]) => <button className={`color-swatch ${bodyColor === color ? "selected" : ""}`} style={{ backgroundColor: color }} onClick={() => setBodyColor(color)} aria-label={`Select ${label}`} key={color} data-testid={`tools-swatch-${label.toLowerCase().replaceAll(" ", "-")}`}><span>{bodyColor === color ? "✓" : ""}</span></button>)}</div><div className="swatch-names"><span data-testid="tools-current-livery">{colorName(bodyColor)}</span><span>DD // BODY</span></div></div>
              <div className="config-control"><span className="control-title" data-testid="tools-finish-label">02 // PAINT FINISH</span><div className="option-grid option-grid-three">{(["Gloss", "Satin", "Metallic"] as Finish[]).map((item) => <button className={finish === item ? "selected" : ""} onClick={() => setFinish(item)} key={item} data-testid={`tools-finish-${item.toLowerCase()}`}>{item.toUpperCase()}</button>)}</div></div>
              <div className="config-control"><span className="control-title" data-testid="tools-wheel-color-label">03 // WHEEL COLOR</span><div className="wheel-swatch-row">{[["#1A1A1A", "BLACK"], ["#CCCCCC", "SILVER"], ["#FF6600", "ORANGE"]].map(([color, label]) => <button className={wheelColor === color ? "selected" : ""} onClick={() => setWheelColor(color)} key={color} data-testid={`tools-wheel-${label.toLowerCase()}`}><span style={{ backgroundColor: color }} />{label}</button>)}</div></div>
              <div className="config-control"><span className="control-title" data-testid="tools-graphic-label">04 // GRAPHIC PACKAGE</span><div className="option-grid option-grid-four">{(["None", "Center", "Offset", "Double GT"] as Graphic[]).map((item) => <button className={graphic === item ? "selected" : ""} onClick={() => setGraphic(item)} key={item} data-testid={`tools-graphic-${item.toLowerCase().replaceAll(" ", "-")}`}>{item.toUpperCase()}</button>)}</div></div>
              <div className="mask-control"><div><span className="control-title">05 // APPLY WINDSHIELD MASKING</span><small>Blank the glass for the race-day template.</small></div><button className={`binary-toggle ${mask ? "active" : ""}`} onClick={() => setMask((value) => !value)} aria-pressed={mask} aria-label="Toggle windshield masking" data-testid="tools-windshield-toggle"><span /></button></div>
            </div>
          </div>

          <div className="livery-command-deck" data-testid="tools-livery-command-deck">
            <div className="build-spec-summary"><div><Sparkles size={18} /><span className="eyebrow">LIVE BUILD TELEMETRY</span></div><dl><div><dt>BODY</dt><dd data-testid="tools-summary-body">{colorName(bodyColor)}</dd></div><div><dt>FINISH</dt><dd data-testid="tools-summary-finish">{finish}</dd></div><div><dt>WHEELS</dt><dd data-testid="tools-summary-wheels">{colorName(wheelColor)}</dd></div><div><dt>GRAPHIC</dt><dd data-testid="tools-summary-graphic">{graphic}</dd></div><div><dt>GLASS</dt><dd data-testid="tools-summary-glass">{mask ? "Masked" : "Clear"}</dd></div></dl></div>
            <div className="build-actions"><Button className="outline-button" onClick={resetBuild} data-testid="tools-reset-build"><RotateCcw size={15} /> RESET</Button><Button className="outline-button" onClick={saveBuild} data-testid="tools-save-build"><Save size={15} /> SAVE BUILD</Button><Button className="orange-button" onClick={downloadBuildCard} data-testid="tools-download-build"><Download size={15} /> DOWNLOAD BUILD CARD</Button></div>
          </div>

          {savedBuilds.length > 0 && <div className="saved-builds" data-testid="tools-saved-builds"><div className="saved-builds-heading"><span className="eyebrow">SAVED LOCALLY // THIS SESSION</span><strong data-testid="tools-saved-build-count">{savedBuilds.length} BUILD{savedBuilds.length === 1 ? "" : "S"}</strong></div><div className="saved-build-grid">{savedBuilds.map((build, index) => <div className="saved-build-card" key={build.id} data-testid={`tools-saved-build-${index + 1}`}><button className="saved-build-load" onClick={() => loadBuild(build)} data-testid={`tools-saved-build-${index + 1}-load`}><span className="saved-build-chip" style={{ backgroundColor: build.body }} /><span><strong>{build.name}</strong><small>{colorName(build.body)} // {build.finish.toUpperCase()} // {build.graphic.toUpperCase()}</small></span></button><button className="saved-build-delete" onClick={() => setSavedBuilds((builds) => builds.filter((item) => item.id !== build.id))} aria-label={`Delete ${build.name}`} data-testid={`tools-saved-build-${index + 1}-delete`}><Trash2 size={15} /></button></div>)}</div></div>}
        </section>
      </main>
      <MagazineFooter />
    </div>
  );
}