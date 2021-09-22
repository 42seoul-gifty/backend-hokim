import { pagenation } from "./pagenation.js";

(function ($) {
  $(function () {
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    document.getElementById("filter").addEventListener("click", () => {
      receiverSort(start.value, end.value);
    });
    receiverSort("");

    const data = location.href.split("&");
    data.forEach((elem) => {
      const value = elem.split("=");
      if (value.length == 1 || value[0].includes("page") || value[1] == "")
        return 1;
      $(document.getElementById(value[0]))[0].setAttribute("value", value[1]);
    });
  });
})(jQuery);

function receiverSort(start, end) {
  let container = $("#pagination");
  container.pagination({
    pageSize: 10,
    dataSource: function (done) {
      axios({
        url: `/admin/shipping/filter?page=${
          document.getElementById("page").textContent
        }`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          start: start,
          end: end,
          _csrf: $("#_csrf").val(),
        }),
      })
        .then((res) => {
          const data = res.data.receiver;

          $("#order_list").empty();
          var dataHtml = "";
          $.each(data, function (index, user) {
            dataHtml += `<tr>
            <td scope="col">
            ${user.id}</td>
            <td scope="col">
            <p onclick="location.href='/admin/receiver/detail/${user.id}'"
            class="btn btn-light">${user.name}
            </p></td>
            <td scope="col">${user.phone}</td>
            <td scope="col">${user.address}, ${user.detail_address}</td>
            <td scope="col">${
              user?.Product?.name ? user.Product.name : "-"
            }</td>
            <td scope="col">
              <select class="form-select" aria-label="Default select example" id="${
                user.id
              }">
                <option value="배송전" ${
                  user.shipment_status == "배송전" ? "selected" : ""
                } >배송전</option>
                <option value="배송요청" ${
                  user.shipment_status == "배송요청" ? "selected" : ""
                }>배송요청</option>
                <option value="배송완료" ${
                  user.shipment_status == "배송완료" ? "selected" : ""
                }>배송완료</option>
                <option value="주문취소" ${
                  user.shipment_status == "주문취소" ? "selected" : ""
                }>주문취소</option>
              </select>
            </td>
          </tr>`;
          });
          $("#order_list").append(dataHtml);

          $(".form-select").each((index, elem) => {
            $(elem).change(() => {
              selectChange(elem);
            });
          });

          pagenation(
            "/admin/shipping",
            res.data.page,
            res.data.totalPage,
            () => {
              return `start=${document.getElementById("start").value}&end=${
                document.getElementById("end").value
              }`;
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const selectChange = (target) => {
    if (!$(target).hasClass("changed")) $(target).addClass("changed");
  };
}
