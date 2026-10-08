function Profile({ studentId, name, university }) {
  return (
    <section
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 py-6 text-[#444] sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-8 lg:grid-cols-[auto_auto_auto_minmax(0,1fr)]"
      aria-label="ข้อมูลผู้จัดทำ"
    >
      <p className="text-base text-shop-muted">จัดทำโดย</p>
      <p className="min-w-0 text-base font-medium wrap-anywhere">{name}</p>
      <p className="col-start-2 text-base text-shop-muted sm:col-start-auto">{studentId}</p>
      <p className="col-span-full min-w-0 text-base text-shop-muted lg:col-span-1 lg:text-right">
        {university}
      </p>
    </section>
  );
}
export default Profile;
