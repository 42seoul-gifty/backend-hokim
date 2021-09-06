(function ($) {
  $(function () {
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    document.getElementById("filter").addEventListener("click", () => {
      receiverSort(start.value, end.value);
    });
    receiverSort("");
  });
})(jQuery);

function receiverSort(start, end) {
  let container = $("#pagination");
  container.pagination({
    pageSize: 10,
    dataSource: function (done) {
      axios({
        url: `/admin/shipping/filter`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          start: start,
          end: end,
        }),
      })
        .then((res) => {
          const data = res.data.receiver;

          $("#order_list").empty();
          var dataHtml = "";
          $.each(data, function (index, user) {
            dataHtml += `<tr>
            <td scope="col">${user.id}</td>
            <td scope="col">${user.gender}</td>
            <td scope="col">${user.age}</td>
            <td scope="col">${user.price}</td>
            <td scope="col">${user.phone}</td>
            <td scope="col">${user.address}</td>
            <td scope="col">${user.detailAddress}</td>
            <td scope="col">${user.product ? user.product : "-"}</td>
            <td scope="col">
              <select class="form-select" aria-label="Default select example">
                <option value="배송전" ${
                  user.shipmentStatus == "배송전" ? "selected" : ""
                } >배송전</option>
                <option value="배송요청" ${
                  user.shipmentStatus == "배송요청" ? "selected" : ""
                }>배송요청</option>
                <option value="배송완료" ${
                  user.shipmentStatus == "배송완료" ? "selected" : ""
                }>배송완료</option>
                <option value="주문취소" ${
                  user.shipmentStatus == "주문취소" ? "selected" : ""
                }>주문취소</option>
              </select>
            </td>
          </tr>`;
          });
          $("#order_list").append(dataHtml);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
}
