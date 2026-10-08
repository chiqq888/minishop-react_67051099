import Profile from "./Profile";

function Footer() {
  return (
    <footer className="mt-[38px] border-t border-shop-border pb-2 text-base text-shop-muted sm:mt-[55px]">
      <div className="grid grid-cols-1 items-center gap-2.5 border-b border-shop-border py-6 md:grid-cols-[1fr_auto_1fr] md:gap-5">
        <span className="text-[21px] font-semibold tracking-[-.7px] text-[#333]">
          MiniShop
        </span>
        <p className="text-left text-[11px] md:text-center">
          สิ่งที่ใช่ สำหรับทุกวันของคุณ
        </p>
        <strong className="text-left text-[11px] font-semibold text-[#333] md:text-right">
          YOUR EVERYDAY, SIMPLIFIED
        </strong>
      </div>
      <Profile
        studentId="67051099"
        name="Ratchatapong Atteephok"
        university="KING MONGKUT'S INSTITUTE OF TECHNOLOGY LADKRABANG"
      />
    </footer>
  );
}
export default Footer;
