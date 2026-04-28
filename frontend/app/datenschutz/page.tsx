import type { Metadata } from "next";
import LegalPageHeader from "@/components/layout/LegalPageHeader";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung des Hamta Restaurants, Hauptstraße 42, 4040 Linz – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://hamtarestaurant.at/datenschutz" },
};

const sections = [
  {
    id: "verantwortlicher",
    title: "1. Verantwortlicher",
    content: (
      <>
        <p>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und des
          österreichischen Datenschutzgesetzes (DSG) ist:
        </p>
        <address className="not-italic mt-4 leading-7" style={{ color: "#99907c" }}>
          <strong style={{ color: "#e5e2e1" }}>Moradi Lebensmittel KG</strong>
          <br />
          Hamta Restaurant
          <br />
          Hauptstraße 42
          <br />
          4040 Linz (Urfahr), Österreich
          <br />
          <br />
          E-Mail:{" "}
          <a
            href="mailto:office@hamtarestaurant.at"
            style={{ color: "#f2ca50" }}
          >
            office@hamtarestaurant.at
          </a>
        </address>
        <p className="mt-4">
          Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte
          an die oben genannte Kontaktadresse.
        </p>
      </>
    ),
  },
  {
    id: "grundsaetze",
    title: "2. Grundsätze der Datenverarbeitung",
    content: (
      <>
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
          funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
          Eine Verarbeitung Ihrer Daten erfolgt ausschließlich auf Basis einschlägiger
          Rechtsgrundlagen der DSGVO, insbesondere:
        </p>
        <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
          <li>
            <strong style={{ color: "#e5e2e1" }}>Art. 6 Abs. 1 lit. a DSGVO</strong> –
            Einwilligung der betroffenen Person
          </li>
          <li>
            <strong style={{ color: "#e5e2e1" }}>Art. 6 Abs. 1 lit. b DSGVO</strong> –
            Vertragserfüllung oder vorvertragliche Maßnahmen
          </li>
          <li>
            <strong style={{ color: "#e5e2e1" }}>Art. 6 Abs. 1 lit. c DSGVO</strong> –
            Erfüllung einer rechtlichen Verpflichtung
          </li>
          <li>
            <strong style={{ color: "#e5e2e1" }}>Art. 6 Abs. 1 lit. f DSGVO</strong> –
            Wahrung berechtigter Interessen des Verantwortlichen
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "serverdaten",
    title: "3. Zugriffsdaten und Server-Logfiles",
    content: (
      <>
        <p>
          Bei jedem Aufruf unserer Website werden durch den Webserver automatisch
          technische Zugriffsdaten erfasst und in sogenannten Server-Logfiles gespeichert.
          Diese Daten sind für uns nicht bestimmten Personen zuordenbar und werden nicht
          mit anderen Datenquellen zusammengeführt. Es handelt sich dabei insbesondere um:
        </p>
        <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
          <li>IP-Adresse des anfragenden Geräts (anonymisiert oder vollständig, je nach Hostingkonfiguration)</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>Name und URL der abgerufenen Datei</li>
          <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
          <li>Verwendeter Browser, Betriebssystem und Gerätetyp</li>
          <li>Name des Internet-Service-Providers</li>
          <li>Übertragene Datenmenge und HTTP-Statuscode</li>
        </ul>
        <p className="mt-4">
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse
          liegt in der technischen Sicherstellung des Betriebs, der Fehleranalyse und der
          Abwehr von Angriffen. Logfiles werden nach spätestens 30 Tagen automatisch
          gelöscht, sofern sie nicht zur Aufklärung eines konkreten Sicherheitsvorfalls
          weiter benötigt werden.
        </p>
      </>
    ),
  },
  {
    id: "hosting",
    title: "4. Hosting und Infrastruktur",
    content: (
      <>
        <p>
          Unsere Website wird bei einem professionellen Hostingdienstleister betrieben.
          Die Verarbeitung durch den Hoster erfolgt auf Basis eines
          Auftragsverarbeitungsvertrages gemäß Art. 28 DSGVO, der die Einhaltung der
          Datenschutzvorschriften sicherstellt.
        </p>
        <p className="mt-4">
          Im Rahmen der Datenübermittlung an den Hostingdienstleister können
          personenbezogene Daten (insbesondere Zugriffsprotokoll-Daten) auf Servern
          innerhalb des Europäischen Wirtschaftsraums (EWR) oder – je nach Anbieter –
          außerhalb desselben verarbeitet werden. Im Fall einer Übermittlung in
          Drittländer ohne angemessenes Datenschutzniveau stützen wir uns auf die von
          der Europäischen Kommission genehmigten Standardvertragsklauseln (Art. 46
          Abs. 2 lit. c DSGVO).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies und ähnliche Technologien",
    content: (
      <>
        <p>
          Unsere Website kann Cookies einsetzen – kleine Textdateien, die im Browser des
          Nutzers gespeichert werden. Wir unterscheiden zwischen technisch notwendigen und
          optionalen Cookies.
        </p>

        <h3 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2ca50" }}>
          5.1 Technisch notwendige Cookies
        </h3>
        <p>
          Diese Cookies sind für den ordnungsgemäßen Betrieb der Website zwingend
          erforderlich. Sie ermöglichen grundlegende Funktionen wie die Seitennavigation
          und werden ohne Einwilligung gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
          DSGVO.
        </p>

        <h3 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2ca50" }}>
          5.2 Optionale Cookies / Analyse- und Marketing-Cookies
        </h3>
        <p>
          Sofern wir optionale Cookies einsetzen, die der Analyse des Nutzerverhaltens
          oder Marketingzwecken dienen, erfolgt dies nur auf Grundlage Ihrer ausdrücklichen
          Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit
          mit Wirkung für die Zukunft widerrufen, indem Sie die Cookie-Einstellungen in
          Ihrem Browser anpassen oder von der Ihnen bereitgestellten
          Widerrufsmöglichkeit Gebrauch machen.
        </p>
        <p className="mt-3">
          Die meisten Browser bieten die Möglichkeit, Cookies zu verwalten, zu
          beschränken oder vollständig zu deaktivieren. Weitere Informationen hierzu
          finden Sie in den Einstellungen Ihres Browsers.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "6. Analyse- und Trackingdienste",
    content: (
      <>
        <p>
          Wir behalten uns vor, zur Verbesserung unseres Internetauftritts und zur
          statistischen Auswertung des Nutzerverhaltens Webanalysedienste einzusetzen.
          Der Einsatz solcher Dienste erfolgt ausschließlich auf Grundlage Ihrer
          ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
        </p>
        <p className="mt-4">
          Sofern Analysetools von Drittanbietern – wie etwa Google Analytics (Google LLC,
          1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) – eingesetzt werden,
          kann dabei eine Übermittlung von Daten in die USA oder andere Drittländer
          stattfinden. Wir stellen in diesem Fall sicher, dass hierfür geeignete
          Garantien im Sinne von Art. 46 DSGVO vorliegen (z. B. Standardvertragsklauseln).
          Näheres zu Datenschutzpraktiken von Google finden Sie unter:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f2ca50" }}
          >
            policies.google.com/privacy
          </a>
          .
        </p>
        <p className="mt-4">
          Derzeit ist der Einsatz von Analysetools auf dieser Website nicht aktiv.
          Diese Datenschutzerklärung wird bei einer Änderung der eingesetzten Dienste
          entsprechend aktualisiert.
        </p>
      </>
    ),
  },
  {
    id: "drittdienste",
    title: "7. Einbindung von Drittdiensten",
    content: (
      <>
        <h3 className="mt-2 mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2ca50" }}>
          7.1 Google Maps
        </h3>
        <p>
          Auf dieser Website nutzen wir den Kartendienst Google Maps der Google LLC,
          1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (bzw. für Nutzer im
          EWR: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).
          Zur Nutzung von Google Maps ist es technisch erforderlich, Ihre IP-Adresse
          zu verarbeiten. Diese Daten werden in der Regel an einen Server von Google
          in den USA übertragen und dort gespeichert.
        </p>
        <p className="mt-3">
          Der Einsatz von Google Maps erfolgt im Interesse einer ansprechenden
          Darstellung unseres Standorts und zur Erleichterung der Anreise.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Für die Übermittlung von
          Daten in die USA berufen wir uns auf die Standardvertragsklauseln der
          Europäischen Kommission. Informationen zu Google Maps und den
          Datenschutzpraktiken von Google finden Sie unter:{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f2ca50" }}
          >
            policies.google.com/privacy
          </a>
          .
        </p>

        <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2ca50" }}>
          7.2 Instagram
        </h3>
        <p>
          Auf unserer Website können Inhalte oder Verlinkungen zum Instagram-Profil der
          Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour,
          Dublin 2, Irland, eingebunden sein. Bei Aufruf dieser Inhalte oder beim
          Klick auf entsprechende Links werden Daten – darunter Ihre IP-Adresse und
          ggf. Geräteinformationen – an Meta übertragen. Dies gilt auch dann, wenn Sie
          kein Instagram-Konto besitzen oder nicht eingeloggt sind.
        </p>
        <p className="mt-3">
          Meta kann diese Daten zu eigenen Zwecken, einschließlich Profiling und
          zielgerichteter Werbung, verarbeiten. Weitere Informationen finden Sie in
          der Datenschutzrichtlinie von Meta:{" "}
          <a
            href="https://privacycenter.instagram.com/policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f2ca50" }}
          >
            privacycenter.instagram.com/policy
          </a>
          .
        </p>

        <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "#f2ca50" }}>
          7.3 TikTok
        </h3>
        <p>
          Diese Website kann Inhalte oder Links zum TikTok-Dienst der TikTok Technology
          Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland (bzw. TikTok Inc.,
          5800 Bristol Pkwy, Suite 100, Culver City, CA 90230, USA) einbinden. Bei der
          Anzeige solcher Inhalte werden technische Daten – darunter Ihre IP-Adresse –
          an TikTok übertragen. Eine Übermittlung dieser Daten in die USA oder andere
          Drittländer ist möglich.
        </p>
        <p className="mt-3">
          Soweit eine Einbindung von TikTok-Inhalten über iFrame oder API erfolgt,
          geschieht dies auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
          Die Datenschutzrichtlinie von TikTok finden Sie unter:{" "}
          <a
            href="https://www.tiktok.com/legal/page/eea/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f2ca50" }}
          >
            tiktok.com/legal/privacy-policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "drittlaender",
    title: "8. Datenübermittlung in Drittländer",
    content: (
      <>
        <p>
          Im Rahmen des Einsatzes der oben genannten Drittdienste (insbesondere Google,
          Meta/Instagram, TikTok) können personenbezogene Daten in Länder außerhalb des
          Europäischen Wirtschaftsraums (EWR) – insbesondere in die USA – übertragen
          werden. In diesen Ländern besteht möglicherweise kein mit dem EWR
          vergleichbares Datenschutzniveau.
        </p>
        <p className="mt-4">
          Wir stützen Drittlandübermittlungen, wo gesetzlich gefordert, auf geeignete
          Garantien im Sinne von Art. 46 DSGVO, insbesondere die von der Europäischen
          Kommission erlassenen Standardvertragsklauseln (SCC). Sofern sich ein Anbieter
          auf das EU-U.S. Data Privacy Framework (DPF) zertifiziert hat, kann die
          Übermittlung auch auf diesen Angemessenheitsbeschluss gestützt werden.
        </p>
      </>
    ),
  },
  {
    id: "kontaktformular",
    title: "9. Kontaktaufnahme",
    content: (
      <>
        <p>
          Wenn Sie uns per E-Mail oder über ein auf der Website bereitgestelltes
          Kontaktformular kontaktieren, werden die von Ihnen angegebenen Daten – in
          der Regel Name und E-Mail-Adresse sowie der Inhalt Ihrer Nachricht – zur
          Bearbeitung Ihrer Anfrage verarbeitet und gespeichert.
        </p>
        <p className="mt-4">
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage im
          Zusammenhang mit der Anbahnung oder Erfüllung eines Vertrages steht, sowie
          Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen an
          der Beantwortung von Kundenanfragen. Die Daten werden gelöscht, sobald Ihre
          Anfrage abschließend bearbeitet wurde und keine gesetzliche Aufbewahrungspflicht
          besteht.
        </p>
      </>
    ),
  },
  {
    id: "speicherdauer",
    title: "10. Speicherdauer und Löschung",
    content: (
      <>
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen
          Verarbeitungszweck erforderlich ist oder wie es gesetzliche Aufbewahrungsfristen
          vorsehen. Maßgeblich sind insbesondere:
        </p>
        <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
          <li>
            <strong style={{ color: "#e5e2e1" }}>Unternehmensrechtliche und steuerrechtliche Aufbewahrungsfristen</strong>{" "}
            gemäß UGB und BAO: in der Regel 7 Jahre
          </li>
          <li>
            <strong style={{ color: "#e5e2e1" }}>Server-Logfiles:</strong> bis zu 30 Tage, außer bei Sicherheitsvorfällen
          </li>
          <li>
            <strong style={{ color: "#e5e2e1" }}>Kontaktanfragen:</strong> nach abschließender Bearbeitung, sofern keine
            Aufbewahrungspflicht besteht
          </li>
        </ul>
        <p className="mt-4">
          Nach Ablauf der jeweiligen Aufbewahrungsfrist oder bei Wegfall des
          Verarbeitungszwecks werden die Daten routinemäßig und ohne gesonderte
          Mitteilung gelöscht oder anonymisiert.
        </p>
      </>
    ),
  },
  {
    id: "ssl",
    title: "11. SSL/TLS-Verschlüsselung",
    content: (
      <>
        <p>
          Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
          vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte
          Verbindung erkennen Sie daran, dass die Adresszeile Ihres Browsers von
          „http://" auf „https://" wechselt und an dem Schloss-Symbol in der
          Browserzeile.
        </p>
        <p className="mt-4">
          Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die
          Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
        </p>
      </>
    ),
  },
  {
    id: "betroffenenrechte",
    title: "12. Ihre Rechte als betroffene Person",
    content: (
      <>
        <p>
          Als betroffene Person stehen Ihnen gegenüber dem Verantwortlichen folgende
          Rechte zu:
        </p>

        <div className="mt-5 flex flex-col gap-5">
          {[
            {
              right: "Recht auf Auskunft (Art. 15 DSGVO)",
              desc:
                "Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten über Sie verarbeiten, sowie Auskunft über diese Daten und die in Art. 15 DSGVO genannten Informationen zu erhalten.",
            },
            {
              right: "Recht auf Berichtigung (Art. 16 DSGVO)",
              desc:
                "Sie haben das Recht, unverzüglich die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten zu verlangen.",
            },
            {
              right: "Recht auf Löschung (Art. 17 DSGVO)",
              desc:
                "Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen, sofern die Voraussetzungen des Art. 17 DSGVO erfüllt sind und keine gesetzliche Aufbewahrungspflicht entgegensteht.",
            },
            {
              right: "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
              desc:
                "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn eine der in Art. 18 DSGVO genannten Voraussetzungen vorliegt.",
            },
            {
              right: "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
              desc:
                "Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten, sofern die Verarbeitung auf einer Einwilligung oder einem Vertrag beruht und mithilfe automatisierter Verfahren erfolgt.",
            },
            {
              right: "Widerspruchsrecht (Art. 21 DSGVO)",
              desc:
                "Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen, wenn die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt.",
            },
            {
              right: "Widerrufsrecht bei Einwilligung (Art. 7 Abs. 3 DSGVO)",
              desc:
                "Soweit die Verarbeitung auf Ihrer Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.",
            },
          ].map(({ right, desc }) => (
            <div key={right} className="pl-4" style={{ borderLeft: "2px solid rgba(242,202,80,0.25)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#e5e2e1" }}>{right}</p>
              <p className="text-sm" style={{ color: "#99907c" }}>{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6">
          Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die unter
          Abschnitt 1 angegebene E-Mail-Adresse. Wir bemühen uns, Ihr Anliegen
          innerhalb eines Monats zu beantworten (Art. 12 Abs. 3 DSGVO).
        </p>
      </>
    ),
  },
  {
    id: "beschwerderecht",
    title: "13. Beschwerderecht bei der Aufsichtsbehörde",
    content: (
      <>
        <p>
          Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen
          Rechtsbehelfs steht Ihnen das Recht zu, Beschwerde bei einer
          Datenschutz-Aufsichtsbehörde einzulegen, wenn Sie der Ansicht sind, dass die
          Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO
          verstößt.
        </p>
        <p className="mt-4">
          Die zuständige Aufsichtsbehörde in Österreich ist die:
        </p>
        <address className="not-italic mt-3 leading-7" style={{ color: "#99907c" }}>
          <strong style={{ color: "#e5e2e1" }}>Österreichische Datenschutzbehörde (DSB)</strong>
          <br />
          Barichgasse 40–42
          <br />
          1030 Wien, Österreich
          <br />
          <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" style={{ color: "#f2ca50" }}>
            www.dsb.gv.at
          </a>
        </address>
      </>
    ),
  },
  {
    id: "aktualitaet",
    title: "14. Aktualität und Änderungen dieser Datenschutzerklärung",
    content: (
      <>
        <p>
          Diese Datenschutzerklärung hat den Stand April 2026. Wir behalten uns vor,
          diese Erklärung anzupassen, um sie stets den aktuellen rechtlichen
          Anforderungen entsprechen zu lassen oder um Änderungen unserer Leistungen
          umzusetzen, z. B. bei der Einführung neuer Dienste. Für Ihren erneuten Besuch
          gilt die jeweils aktuell veröffentlichte Fassung.
        </p>
      </>
    ),
  },
];

export default function DatenschutzPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#131313", color: "#e5e2e1" }}
    >
      <LegalPageHeader />

      <div className="max-w-3xl mx-auto px-5 lg:px-10 py-16 lg:py-24">
        {/* Page title */}
        <div className="mb-14">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#f2ca50", letterSpacing: "0.14em" }}
          >
            Rechtliches
          </p>
          <h1
            className="font-serif text-3xl lg:text-4xl font-semibold leading-snug mb-5"
            style={{ color: "#e5e2e1" }}
          >
            Datenschutzerklärung
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#4a4640" }}>
            Gemäß Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO) und dem
            österreichischen Datenschutzgesetz (DSG) informieren wir Sie nachstehend
            über Art, Umfang und Zweck der Erhebung und Verwendung personenbezogener
            Daten auf dieser Website.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map(({ id, title, content }) => (
            <section key={id} id={id}>
              <h2
                className="font-serif text-lg font-semibold mb-4 pb-3"
                style={{
                  color: "#e5e2e1",
                  borderBottom: "1px solid rgba(242,202,80,0.12)",
                }}
              >
                {title}
              </h2>
              <div className="text-sm leading-7" style={{ color: "#99907c" }}>
                {content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div
          className="mt-16 pt-8 text-xs leading-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            color: "#353535",
          }}
        >
          <p>Stand: April 2026 · Hamta Restaurant, Moradi Lebensmittel KG, Hauptstraße 42, 4040 Linz</p>
        </div>
      </div>
    </main>
  );
}
