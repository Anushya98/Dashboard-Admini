import { ArrowUp, ArrowDown } from "lucide-react";

function CurvedCard({ icon, title, count, isLeavesPage, isDashboardPage, percentageChange, percentageText }) {
  const isPositiveChange = percentageChange > 0;
  const ArrowIcon = isPositiveChange ? ArrowUp : ArrowDown; // Capitalized the variable to use it as a component
  const textColorClass = isPositiveChange ? "text-green-500" : "text-red-500";
  const shadowColorClass = isPositiveChange ? "shadow-green-500" : "shadow-red-500";

  // Set width based on isDashboardPage
  const cardWidth = isDashboardPage ? "w-[13dvw]" : "w-[18dvw]";

  return (
    <section className={`relative ${cardWidth} h-[min(25dvh,10rem)]`}>
      <div className="w-[6dvw] absolute left-0 top-0 aspect-square rounded-full z-10 grid place-items-center bg-background">
        <div className={`w-[5dvw] aspect-square rounded-full bg-customBlue grid place-items-center ${shadowColorClass}`}>
          <img src={icon} alt="icon" className="w-6" />
        </div>
      </div>
      <div className="h-[88%] w-[92%] rounded-2xl absolute top-[1.25rem] left-[1.25rem] z-0 bg-white shadow">
        <div className="font-semibold text-base space-y-2 p-2">
          <div className="mt-4 ml-[calc(6dvw-0.75dvw)]">
            <h3>{title}</h3>
            <div className="flex items-center">
              <p className="font-normal text-xs">
                {count} {isLeavesPage && "Number of Days"}
              </p>
              {isDashboardPage && (
                <div className="flex items-center ml-2">
                  <ArrowIcon className={`h-4 w-4 ${textColorClass}`} />
                  <span className={`text-xs ${textColorClass} ml-1`}>{(percentageChange * 100).toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>

          {isDashboardPage && (
            <div className="mt-1 text-xs">
              {percentageText}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CurvedCard;
