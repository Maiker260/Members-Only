const userInfo = document.getElementById("userInfo");
const userDialog = document.getElementById("userDialog");
const arrow = document.getElementById("arrow");
const newPostBtn = document.getElementById("newPostBtn");
const newMessageDialog = document.getElementById("newMessageDialog");
const newMessageDialogCloseBtn = document.getElementById(
    "newMessageDialogCloseBtn"
);
const reqMembershipDialog = document.getElementById("reqMembershipDialog");
const reqMembershipBtn = document.getElementById("reqMembershipBtn");
const reqMembershipDialogCloseBtn = document.getElementById(
    "reqMembershipDialogCloseBtn"
);

if (userInfo) {
    userInfo.addEventListener("click", () => {
        if (userDialog.open) {
            userDialog.close();
            arrow.classList.remove("rotated");
        } else {
            userDialog.show();
            arrow.classList.add("rotated");
        }
    });

    document.addEventListener("click", (event) => {
        if (!userInfo.contains(event.target) && userDialog.open) {
            userDialog.close();
            arrow.classList.remove("rotated");
        }
    });

    newPostBtn.addEventListener("click", (e) => {
        newMessageDialog.showModal();
    });

    newMessageDialogCloseBtn.addEventListener("click", () => {
        newMessageDialog.close();
    });

    newMessageDialog.addEventListener("click", (e) => {
        const dialogDimensions = newMessageDialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            newMessageDialog.close();
        }
    });

    reqMembershipBtn.addEventListener("click", (e) => {
        reqMembershipDialog.showModal();
    });

    reqMembershipDialogCloseBtn.addEventListener("click", () => {
        reqMembershipDialog.close();
    });

    reqMembershipDialog.addEventListener("click", (e) => {
        const dialogDimensions = reqMembershipDialog.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            reqMembershipDialog.close();
        }
    });
}
