import { convertToFarsi } from "@/lib/utils";

type props = {
  detailes: { guests: number; bedrooms: number; beds: number; baths: number };
};
function PropertyDetails({ detailes }: props) {
  return (
    <div className="flex items-center justify-end gap-x-3">
      <div>
        <span>{convertToFarsi(detailes.guests)}</span>
        <span>مهمان</span>
      </div>
      <div>
        <span>{convertToFarsi(detailes.beds)}</span>
        <span>تخت</span>
      </div>
      <div>
        <span>{convertToFarsi(detailes.bedrooms)}</span>
        <span>اتاق</span>
      </div>
      <div>
        <span>{convertToFarsi(detailes.baths)}</span>
        <span>حمام</span>
      </div>
    </div>
  );
}

export default PropertyDetails;
