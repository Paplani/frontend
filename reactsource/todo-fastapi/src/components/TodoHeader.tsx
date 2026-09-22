function TodoHeader({
  onFilterChange,
}: {
  onFilterChange: (completed: boolean | null) => void;
}) {
  console.log("TodoHeader rendered");
  return (
    <div className="flex p-3">
      <span className="flex-1 text-left text-orange-700">중요 일정은 체크</span>
      <div className="shrink-0">
        <span>완료</span>
        <select
          name="completed"
          className="mx-2 rounded border border-gray-400"
          onChange={(e) => {
            const value = e.target.value;
            onFilterChange(value === "" ? null : value === "true");
            // === 는 두 값이 비슷한지 비교하는 연산자. value === "true" 면 true가 반환되고 아니면 false가 반환됨.
          }}
        >
          {[
            { label: "전체", value: "" },
            { label: "완료", value: "true" },
            { label: "미완료", value: "false" },
          ].map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TodoHeader;
