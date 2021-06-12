import React, { useState, useEffect } from "react";
import { getAllCustomers, customerPay } from "../js/customer";
import CustomTable from "../../../../template/partials/components/CustomTable";
import Swal from "sweetalert2";

function CustomerTable(props) {
  const { filterFunc, updated, setUpdated } = props;
  const [customersList, setCustomersList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCustomers();
      setCustomersList(data);
      console.log(data);
    };
    fetchData();
  }, [updated]);

  const headerCells = [
    {
      id: "name",
      label: "Họ Tên",
    },
    {
      id: "phoneNumber",
      label: "SĐT ",
    },
    {
      id: "email",
      label: "Email ",
    },
    {
      id: "address",
      label: "Địa chỉ ",
    },
    {
      id: "debt",
      label: "Tiền nợ",
      isCurrency: true,
    },
  ];

  const updateHandler = async (customer) => {
    const { value: money } = await Swal.fire({
      title: "Thu tiền nợ",
      input: "text",
      inputLabel: "Thu tiền nợ",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Không được để trống!";
        }
        if (isNaN(value))
        {
          return "Định đạng không đúng!";
        }
        let temp = parseInt(value);
        if (temp > customer.debt)
        {
          return `Tiền thu không được vượt quá nợ: ${customer.debt} đ`
        }
      },
    });
    if (money) {
      const result = await customerPay(customer.id, money);
      if (result.status === 200) {
        Swal.fire({
          title: "Thu nợ thành công",
          icon: "success",
        });
        setUpdated(!updated);
      } else {
        Swal.fire({
          title: "Thu nợ thất bại",
          icon: "error",
        });
      }
    }
  };
  return (
    <div>
      <div className="table-responsive">
        <CustomTable
          headerCells={headerCells}
          data={customersList}
          filterFunc={filterFunc}
          hasPaging={true}
          updateHandler={updateHandler}
        />
      </div>
    </div>
  );
}

export default CustomerTable;
