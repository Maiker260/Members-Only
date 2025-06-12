const get = (id) => document.getElementById(id);

const userInfo = get("userInfo");
const userDialog = get("userDialog");
const arrow = get("arrow");

const newPostBtn = get("newPostBtn");
const newMessageDialog = get("newMessageDialog");
const newMessageDialogCloseBtn = get("newMessageDialogCloseBtn");

const reqMembershipBtn = get("reqMembershipBtn");
const reqMembershipDialog = get("reqMembershipDialog");
const reqMembershipDialogCloseBtn = get("reqMembershipDialogCloseBtn");

const manageButtons = document.querySelectorAll(".message-remove-btn");
const manageDialogs = document.querySelectorAll(".manage-message-dialog");

function closeOnOutsideClick(dialog) {
    dialog.addEventListener("click", (e) => {
        const rect = dialog.getBoundingClientRect();
        if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
        ) {
            dialog.close();
        }
        console.log("outside");
    });
}

function setupModalDialog(openBtn, dialog, closeBtn) {
    if (openBtn && dialog) {
        openBtn.addEventListener("click", () => dialog.showModal());
        closeOnOutsideClick(dialog);
    }
    if (closeBtn) {
        closeBtn.addEventListener("click", () => dialog.close());
    }
}

function setupToggleDialog(triggerBtn, dialog, extraToggleClass = null) {
    if (!triggerBtn || !dialog) return;

    triggerBtn.addEventListener("click", () => {
        if (dialog.open) {
            dialog.close();
            extraToggleClass && arrow.classList.remove(extraToggleClass);
        } else {
            dialog.show();
            extraToggleClass && arrow.classList.add(extraToggleClass);
        }
    });

    document.addEventListener("click", (event) => {
        if (
            !triggerBtn.contains(event.target) &&
            dialog.open &&
            !dialog.contains(event.target)
        ) {
            dialog.close();
            extraToggleClass && arrow.classList.remove(extraToggleClass);
        }
    });
}

setupToggleDialog(userInfo, userDialog, "rotated");
setupModalDialog(newPostBtn, newMessageDialog, newMessageDialogCloseBtn);
setupModalDialog(
    reqMembershipBtn,
    reqMembershipDialog,
    reqMembershipDialogCloseBtn
);

manageButtons.forEach((btn, index) => {
    const dialog = manageDialogs[index];

    if (!btn || !dialog) return;

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (dialog.open) {
            dialog.close();
        } else {
            dialog.show();
        }
    });

    document.addEventListener("click", (e) => {
        if (!dialog.contains(e.target) && e.target !== btn) {
            dialog.close();
        }
    });
});
