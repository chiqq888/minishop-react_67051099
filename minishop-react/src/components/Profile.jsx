function Profile({ studentId, name, university }) {
  return (
    <section
      data-ui="author-profile"
      className="flex flex-wrap items-center gap-x-6 gap-y-2.5 py-6 text-[#444] min-[541px]:gap-x-12 min-[541px]:gap-y-3"
      aria-label="ข้อมูลผู้จัดทำ"
    >
      <p data-ui="author-label" className="text-base text-[#767676]">
        จัดทำโดย
      </p>
      <p data-ui="author-name" className="text-base font-medium wrap-anywhere">
        {name}
      </p>
      <p data-ui="author-id" className="text-base text-[#767676]">
        {studentId}
      </p>
      <p
        data-ui="author-university"
        className="ml-auto min-w-0 max-w-full text-right text-base wrap-anywhere text-[#767676] max-[540px]:basis-full"
      >
        {university}
      </p>
    </section>
  );
}
export default Profile;
