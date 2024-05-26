import EditUserForm from "@/components/admin/editUser/editUserForm";

const Page = ({ params }: { params: { usu_id: string } }) => {

  return (
    <>
      <EditUserForm usu_id={params.usu_id} />
    </>
  );
};

export default Page;