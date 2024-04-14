// Import React and necessary Tailwind CSS functionality
import React from "react";

const authenticationPoints = [
  {
    label: "Colour",
    description:
      "We meticulously verify the sneaker's color against the manufacturer's exact specifications, ensuring it matches the authentic hues without any discrepancies. This includes checking for color consistency and fade, which can often indicate counterfeits.",
  },
  {
    label: "Material and Structure",
    description:
      "Each sneaker is scrutinized for its material quality and structural integrity, comparing textiles, leathers, and other materials against known standards for the brand and model. The feel, weight, and flexibility are assessed to ensure they meet the high standards expected of authentic pieces.",
  },
  {
    label: "Stitching",
    description:
      "Attention to detail is crucial, and stitching is no exception. We examine the stitching patterns, thread quality, and seam strength, as authentic sneakers display a high level of craftsmanship with uniform and secure stitches.",
  },
  {
    label: "Sole",
    description:
      "The sole is examined for its material composition, tread pattern, and overall durability. Authentic sneakers have soles that are designed for longevity and performance, with specific textures and patterns that are often hard to replicate precisely.",
  },
  {
    label: "Label and Tag",
    description:
      "Labels and tags contain vital information, including brand markings, size, and manufacturing details. We ensure these are not only present and accurate but also match the brand’s standards for font, placement, and design.",
  },
];

const qualityCheckPoints = [
  {
    label: "SKU and Size",
    description:
      "Every sneaker's SKU (Stock Keeping Unit) and size are carefully checked against the manufacturer's details to ensure they match the product specifications exactly. This includes verifying that the size indicated on the shoe corresponds to its actual fit and dimensions.",
  },
  {
    label: "Right and Left Match",
    description:
      "We ensure that the right and left sneakers are a perfect match in terms of size, color, and design details. Discrepancies in pair matches are a common issue with counterfeit products.",
  },
  {
    label: "Shoe Condition",
    description:
      "The overall condition of the shoe is assessed, looking for any defects, wear, or damage. This includes inspecting the sneaker for any blemishes, scratches, or imperfections that could affect its value and authenticity.",
  },
  {
    label: "Box Condition",
    description:
      "The condition and authenticity of the shoebox are also verified. An authentic shoebox has specific designs, logos, and information that match the brand’s standards, and the condition of the box can also indicate how the sneakers have been stored and handled.",
  },
  {
    label: "Accessories",
    description:
      "Any additional accessories that should come with the sneakers, such as extra shoelaces, authenticity cards, or special packaging, are checked for their presence and condition. Authentic accessories are often overlooked by counterfeiters but are an essential part of the product's overall value.",
  },
];

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-[rgba(30,30,30,1) border-b-white">
      <img src="/image/banner.jpg" />

      <section className="bg-[rgba(30,30,30,1)]">
        <h2 className="text-3xl font-bold text-white mb-2 py-5 flex justify-center items-center">
          <span className="text-[100px] mr-3">5</span> Authentication Points
        </h2>
        <img src="/image/AuthenticationPoints.png" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
          {authenticationPoints.map((point, index) => (
            <div key={index} className="shadow-md rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-xl text-gray-800">
                {point.label}
              </h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[rgba(30,30,30,1)]">
        <h2 className="text-3xl py-5 font-bold mb-2 text-white flex justify-center items-center">
          <span className="text-[100px] mr-3">5</span> Quality Check Points
        </h2>
        <img src="/image/QualityCheckPoints.png" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
          {qualityCheckPoints.map((point, index) => (
            <div key={index} className="shadow-md rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-xl text-gray-800">
                {point.label}
              </h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[rgba(30,30,30,1)]">
        <h2 className="text-3xl font-bold text-white mb-2 pt-5 flex justify-center items-center">
          <span className="text-[100px] mr-3">2</span> Inspections Points :{" "}
          <br />
          Double Check by SU Specialists
        </h2>
        <img src="/image/InspectionPoints.jpg" />
        <div className="grid grid-cols-1 gap-4 p-4">
          <div className="shadow-md rounded-lg p-4 bg-white">
            <p className="text-gray-700 text-center">
              To ensure no detail is overlooked, every sneaker undergoes a
              rigorous double-check by our SU specialists. This two-step
              verification process guarantees the authenticity and quality of
              the sneakers, providing peace of mind that each pair meets our
              high standards before reaching our customers
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
