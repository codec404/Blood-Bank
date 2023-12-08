import React from "react";
import Layout from "../../components/Shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3 className="mt-3">Manage Blood Bank App</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
            cupiditate nam voluptatibus corporis ratione omnis vel saepe, ex
            ullam vero autem voluptatum aliquam, quo repellat minima nihil
            pariatur iusto totam beatae fugit a provident neque temporibus
            recusandae. Repellendus, accusamus! Pariatur animi esse iure optio,
            voluptates fugiat officia sit impedit similique, dolores quam odio
            commodi reiciendis saepe quidem aliquam corporis atque magni eius
            illum sequi officiis minima? Molestiae ullam necessitatibus nulla,
            illum dolorum, quis officiis minus unde commodi voluptates maiores?
            Repellat, dolorum? Est dolores enim aliquid doloribus nobis sit
            voluptatem pariatur? Dolore quisquam vero quibusdam voluptas
            nesciunt voluptatum aliquam possimus eaque animi beatae eos vitae
            numquam, a quae fugiat tempora, nostrum, pariatur error sequi
            blanditiis maxime nisi reprehenderit sunt? Voluptates expedita id
            omnis nobis doloremque obcaecati? Cupiditate dolorem molestiae
            consequatur quis ad velit praesentium, eos, tempora harum
            repellendus impedit earum quia totam nisi minima nobis reprehenderit
            modi? Inventore magni eum similique sit blanditiis nam a maiores
            quam nesciunt unde odio cupiditate ea et quas dolores pariatur
            excepturi optio, eveniet ullam voluptas debitis distinctio.
            Dignissimos consequatur vel quaerat quos aperiam eveniet in ea
            quisquam distinctio, aliquam velit impedit, earum, doloremque
            voluptatem! Similique et quis deserunt at quae quidem soluta velit,
            aperiam delectus.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
