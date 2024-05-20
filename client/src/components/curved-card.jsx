function CurvedCard({ icon, title, count, isLeavesPage }) {
  return (
    <section className="relative w-[18dvw] h-[min(25dvh,10rem)]">
      <div className="w-[6dvw] absolute left-0 top-0 aspect-square rounded-full z-10 grid place-items-center bg-background">
        <div className="w-[5dvw] aspect-square rounded-full bg-customBlue grid place-items-center" >
          <img src={icon} alt="icon" className="h-1/2" />
        </div>
      </div>
      <div className="h-[88%] w-[92%] rounded-2xl absolute top-[1.25rem] left-[1.25rem] z-0 bg-white shadow  ">
        <div className="font-semibold text-base mt-4 ml-[calc(6dvw-0.75dvw)] space-y-2 p-2">
          <h3>{title}</h3>
          <p className="font-normal text-xs">{count} {isLeavesPage && 'Number of Days'}</p>

        </div>
      </div>
    </section>
  );
}


export default CurvedCard;
