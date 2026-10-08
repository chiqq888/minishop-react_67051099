function Profile({ studentId, name, university }) {
  return (
    <section
      className="flex flex-wrap items-center gap-x-6 gap-y-2.5 py-6 text-[#444] sm:gap-x-12 sm:gap-y-3"
      aria-label="ข้อมูลผู้จัดทำ"
    >
      <p className="text-base text-shop-muted">จัดทำโดย</p>
      <p className="text-base font-medium wrap-anywhere">{name}</p>
      <p className="text-base text-shop-muted">{studentId}</p>
      <p className="ml-auto min-w-0 max-w-full text-right text-base wrap-anywhere text-shop-muted max-sm:basis-full">
        {university}
      </p>
    </section>
  );
}
export default Profile;
