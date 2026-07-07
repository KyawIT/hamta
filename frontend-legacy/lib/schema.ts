export function getRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Hamta Restaurant",
    alternateName: "Hamta",
    description:
      "Persisches und afghanisches Restaurant in Linz-Urfahr. Täglich frisch zubereitete Kebap-Gerichte, Grill-Spezialitäten und traditionelle Lammgerichte.",
    url: "https://hamtarestaurant.at",
    logo: "https://hamtarestaurant.at/logo.png",
    image: "https://hamtarestaurant.at/logo.png",
    telephone: "+43 732 000000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hauptstraße 42",
      addressLocality: "Linz",
      addressRegion: "Oberösterreich",
      postalCode: "4040",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.3175,
      longitude: 14.2947,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    servesCuisine: ["Persisch", "Afghanisch", "Orientalisch", "Kebap", "Grill"],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    menu: "https://hamtarestaurant.at/#menu",
    hasMap: "https://maps.google.com/?q=Hauptstraße+42,+4040+Linz",
    sameAs: [
      "https://www.instagram.com/hamtarestaurant1/",
      "https://www.tiktok.com/@hamta.restaurant",
    ],
  };
}
