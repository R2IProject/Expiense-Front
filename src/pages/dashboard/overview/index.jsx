import SidebarLayout from "@/layout/layout";  
export default function Overview() {
  return (
    <SidebarLayout>
      <h1>Welcome to your Dashboard</h1>
    </SidebarLayout>
  );
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  if (!token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token: null,
    },
  };
};
