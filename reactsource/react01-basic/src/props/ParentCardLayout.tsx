import CardLayout from "./CardLayout";

const ParentCardLayout = () => {
  // props children : 컴포넌트 태그 사이에 넣은 내용을 전달받는 props

  return (
    <div>
      <CardLayout>
        <p>Props of Components</p>
      </CardLayout>
      <CardLayout title="Details">
        <ul>
          <li>Feature A</li>
          <li>Feature B</li>
          <li>Feature C</li>
        </ul>
      </CardLayout>
      <CardLayout title="Contact">
        <p>Email : example@example.com</p>
        <p>Phone : 010-1234-5678</p>
      </CardLayout>
    </div>
  );
};

export default ParentCardLayout;
