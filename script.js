
// SIDEBAR
let activeIconId = "messageIcon";
let activeContentId = "messageContent";

document.getElementById(activeIconId).classList.add("active");
document.getElementById(activeContentId).style.display = "block";

function toggleContent(iconId, contentId) {
  const icon = document.getElementById(iconId);
  const content = document.getElementById(contentId);

  icon.addEventListener("click", function () {
    if (activeIconId === iconId) return;

    document.getElementById("archiveContent").style.display = "none";
    document.getElementById("contactContent").style.display = "none";

    if (activeContentId) {
      document.getElementById(activeContentId).style.display = "none";
      document.getElementById(activeIconId).classList.remove("active");
    }

    content.style.display = "block";
    icon.classList.add("active");

    activeIconId = iconId;
    activeContentId = contentId;
  });
}

toggleContent("messageIcon", "messageContent");
toggleContent("starIcon", "starContent");
toggleContent("profileIcon", "profileContent");
toggleContent("settingsIcon", "settingsContent");
toggleContent("channelIcon", "channelContent");
toggleContent("statusIcon", "statusContent");
toggleContent("communityIcon", "communityContent");




// ARCHIVE/CONTACT
document.addEventListener("DOMContentLoaded", function () {
  function showContent(sectionId) {
    document.getElementById("messageContent").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
  }

  function hideContent(sectionId) {
    document.getElementById("messageContent").style.display = "block";
    document.getElementById(sectionId).style.display = "none";
  }

  document.querySelector(".archive-section").addEventListener("click", function() {
    showContent("archiveContent");
  });
  document.querySelector("#archiveContent .back-arrow").addEventListener("click", function() {
    hideContent("archiveContent");
  });

  document.querySelector(".contact-section").addEventListener("click", function() {
    showContent("contactContent");
  });
  document.querySelector("#contactContent .back-arrow").addEventListener("click", function() {
    hideContent("contactContent");
  });
});




//VIEW MORE FOR COMMUNITY AND STATUS
const viewButtons = document.querySelectorAll(".view");
const moreSections = document.querySelectorAll(".more");

viewButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const moreSection = moreSections[index];

    moreSection.classList.toggle("open-all");

    if (button.closest(".muted")) {
      if (moreSection.classList.contains("open-all")) {
        button.innerHTML = "Hide";
      } else {
        button.innerHTML = "Show";
      }
    } else {
      if (moreSection.classList.contains("open-all")) {
        button.innerHTML = "View Less";
      } else {
        button.innerHTML = "View All ";
      }
    }
  });
});






//DROPDOWN  MENU WHEN CLICKED ON ADD ICON AT CHAT SECTION
const menuIcons = document.querySelectorAll('.menu-icon');

menuIcons.forEach(function(menuIcon) {
  const dropdownMenu = menuIcon.querySelector('.dropdown-menu');

  menuIcon.addEventListener('click', function () {
    menuIcon.classList.toggle('active');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', function (event) {
    if (!menuIcon.contains(event.target)) {
      dropdownMenu.style.display = 'none';
      menuIcon.classList.remove('active');
    }
  });
});




 //DROPDOWN FOR EACH CHATBOX AT MESSAGE / ARCHIVE BODY
document.querySelectorAll(".msg-dropdown").forEach((chatbox) => {
  const dropdownMenu = document.createElement("div");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.innerHTML = `
        <div class="dropdown-item">Archive chat</div>
        <div class="dropdown-item">Mute notifications</div>
        <div class="dropdown-item">Delete chat</div>
        <div class="dropdown-item">Pin chat</div>
        <div class="dropdown-item">Mark as unread</div>
        <div class="dropdown-item">Block</div>
    `;

  chatbox.querySelector(".dropdown-arrow").appendChild(dropdownMenu);

  chatbox
    .querySelector(".dropdown-arrow")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      const rect = chatbox.getBoundingClientRect();

      dropdownMenu.style.top = `${rect.bottom - 10}px`;
      dropdownMenu.style.left = `${rect.left + 380}px`; 
      dropdownMenu.style.display = "block";
    });

  chatbox.addEventListener("mouseleave", function () {
    dropdownMenu.style.display = "none";
  });
});



// FOR BUTTON FILTERRING
const filterButtons = document.querySelectorAll(".filter");
const chatboxes = document.querySelectorAll(".chatbox");
const archiveBlock = document.querySelector(".archive-section");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filterType = button.getAttribute("data-filter");

    chatboxes.forEach(chatbox => {
      const shouldDisplay =
        filterType === "all" || chatbox.classList.contains(filterType);
      chatbox.style.display = shouldDisplay ? "flex" : "none";

      if (filterType === "all") {
        archiveBlock.style.display = "flex";
      } else {
        archiveBlock.style.display = "none";
      }
      const hrElement = chatbox.nextElementSibling;
      if (hrElement && hrElement.tagName === "HR") {
        hrElement.style.display = shouldDisplay ? "block" : "none";
      }
    });
  });
});






// OPEN CHAT/ VIEW MESSAGE
function openMsg(userMsg) {
    const chatContents = document.querySelectorAll(".right-side");
    const chatBlocks = document.querySelectorAll(".view-message");

    chatContents.forEach((content) => (content.style.display = "none"));
    chatBlocks.forEach((link) => link.classList.remove("active"));

    document.getElementById(userMsg).style.display = "block";
    document.querySelector(`[onclick="openMsg('${userMsg}')"]`).classList.add("active");
}




//HERO BACKGROUND
function hideOpenChatOnClick() {
    const chatBlocks = document.querySelectorAll(".view-message");
    const openChat = document.getElementById("hero-background");

    chatBlocks.forEach(chatBlock => {
        chatBlock.addEventListener("click", () => {
          openChat.style.display = "none";

          chatBlocks.forEach((block) => block.classList.remove("active"));
          chatBlock.classList.add("active");
        });
    });
}
hideOpenChatOnClick();