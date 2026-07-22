/* Template Name: Techwind - Tailwind CSS Multipurpose Landing & Admin Dashboard Template
   Author: Shreethemes
   Website: https://shreethemes.in
   Version: 2.2.0 (Optimized for blunix.com)
   File Description: Consolidated JS file with only used features
*/

/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Preloader            *
 *     02.  Menu System          *
 *     03.  Sticky Navigation    *
 *     04.  Back to Top          *
 *     05.  Active Sidebar       *
 *     06.  Company Slider       *
 *     07.  Calculator Inputs    *
 *     08.  External Links       *
 *     09.  Tabs Component       *
 *     10.  Accordion Component  *
 ================================*/

//=========================================//
/*            01) Preloader                */
//=========================================//
window.addEventListener("load", fn, false);

function fn() {
  // Preloader
  if (document.getElementById("preloader")) {
    setTimeout(() => {
      document.getElementById("preloader").style.visibility = "hidden";
      document.getElementById("preloader").style.opacity = "0";
    }, 350);
  }
  // Menus
  activateMenu();
}

//=========================================//
/*            02) Menu System              */
//=========================================//

// Submenu toggle
const hasSubMenuItems = document.querySelectorAll(".has-submenu");

hasSubMenuItems.forEach((item) => {
  const subItem = item.querySelector(".submenu");

  item.addEventListener("click", () => {
    if (subItem.classList.contains("submenu-active")) {
      subItem.classList.remove("submenu-active");
    } else {
      subItem.classList.add("submenu-active");
    }
  });
});

// Toggle Menu (mobile)
function toggleMenu() {
  document.getElementById("isToggle").classList.toggle("open");
  var isOpen = document.getElementById("navigation");
  if (isOpen.style.display === "block") {
    isOpen.style.display = "none";
  } else {
    isOpen.style.display = "block";
  }
}

// Menu Active State
function getClosest(elem, selector) {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
}

function activateMenu() {
  var menuItems = document.getElementsByClassName("sub-menu-item");
  if (menuItems) {
    var matchingMenuItem = null;
    for (var idx = 0; idx < menuItems.length; idx++) {
      if (menuItems[idx].href === window.location.href) {
        matchingMenuItem = menuItems[idx];
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");

      var immediateParent = getClosest(matchingMenuItem, "li");

      if (immediateParent) {
        immediateParent.classList.add("active");
      }

      var parent = getClosest(immediateParent, ".child-menu-item");
      if (parent) {
        parent.classList.add("active");
      }

      var parent = getClosest(parent || immediateParent, ".parent-menu-item");

      if (parent) {
        parent.classList.add("active");

        var parentMenuitem = parent.querySelector(".menu-item");
        if (parentMenuitem) {
          parentMenuitem.classList.add("active");
        }

        var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
        if (parentOfParent) {
          // parentOfParent.classList.add("active");
        }
      } else {
        var parentOfParent = getClosest(
          matchingMenuItem,
          ".parent-parent-menu-item",
        );
        if (parentOfParent) {
          // parentOfParent.classList.add("active");
        }
      }
    }
  }
}

// Clickable Menu
if (document.getElementById("navigation")) {
  var elements = document
    .getElementById("navigation")
    .getElementsByTagName("a");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (elem) {
      if (elem.target.getAttribute("href") === "javascript:void(0)") {
        var submenu = elem.target.nextElementSibling.nextElementSibling;
        submenu.classList.toggle("open");
      }
    };
  }
}

//=========================================//
/*         03) Sticky Navigation           */
//=========================================//
function windowScroll() {
  const navbar = document.getElementById("topnav");
  if (navbar != null) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

//=========================================//
/*          04) Back to Top                */
//=========================================//
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  var mybutton = document.getElementById("back-to-top");
  if (mybutton != null) {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.classList.add("block");
      mybutton.classList.remove("hidden");
    } else {
      mybutton.classList.add("hidden");
      mybutton.classList.remove("block");
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//=========================================//
/*          05) Active Sidebar             */
//=========================================//
(function () {
  var current = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1,
  );
  if (current === "") return;
  var menuItems = document.querySelectorAll(".sidebar-nav a");
  for (var i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
      menuItems[i].parentElement.className += " active";
    }
  }
})();

//=========================================//
/*         06) Company Slider              */
//=========================================//
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for reduced motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

//=========================================//
/*         07) Calculator Inputs           */
//=========================================//
document.querySelectorAll("[data-calc-target]").forEach((input) => {
  input.addEventListener("input", function () {
    const targetSelector = this.getAttribute("data-calc-target");
    const multiplier =
      parseFloat(this.getAttribute("data-calc-multiplier")) || 0;
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const number = parseFloat(this.value);
    target.textContent = number ? number * multiplier : 0;
  });
});

//=========================================//
/*         08) External Links              */
//=========================================//
// Make all external links open in new tabs
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href]");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    // Check if link is external (starts with http/https and doesn't contain current domain)
    if (
      href &&
      (href.startsWith("http://") || href.startsWith("https://")) &&
      !href.includes(window.location.hostname)
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
});

//=========================================//
/*         09) Tabs Component              */
//=========================================//
try {
  const TabsDefault = {
    defaultTabId: null,
    activeClasses: "text-white bg-blue-600",
    inactiveClasses: "hover:text-blue-600 hover:bg-gray-50",
    onShow: () => {},
  };

  class Tabs {
    constructor(items = [], options = {}) {
      this._items = items;
      this._activeTab = options ? this.getTab(options.defaultTabId) : null;
      this._options = { ...TabsDefault, ...options };
      this._init();
    }

    _init() {
      if (this._items.length) {
        // set the first tab as active if not set by explicitly
        if (!this._activeTab) {
          this._setActiveTab(this._items[0]);
        }

        // force show the first default tab
        this.show(this._activeTab.id, true);

        // show tab content based on click
        this._items.map((tab) => {
          tab.triggerEl.addEventListener("click", () => {
            this.show(tab.id);
          });
        });
      }
    }

    getActiveTab() {
      return this._activeTab;
    }

    _setActiveTab(tab) {
      this._activeTab = tab;
    }

    getTab(id) {
      return this._items.filter((t) => t.id === id)[0];
    }

    show(id, forceShow = false) {
      const tab = this.getTab(id);

      // don't do anything if already active
      if (tab === this._activeTab && !forceShow) {
        return;
      }

      // hide other tabs
      this._items.map((t) => {
        if (t !== tab) {
          t.triggerEl.classList.remove(
            ...this._options.activeClasses.split(" "),
          );
          t.triggerEl.classList.add(
            ...this._options.inactiveClasses.split(" "),
          );
          t.targetEl.classList.add("hidden");
          t.triggerEl.setAttribute("aria-selected", false);
        }
      });

      // show active tab
      tab.triggerEl.classList.add(...this._options.activeClasses.split(" "));
      tab.triggerEl.classList.remove(
        ...this._options.inactiveClasses.split(" "),
      );
      tab.triggerEl.setAttribute("aria-selected", true);
      tab.targetEl.classList.remove("hidden");

      this._setActiveTab(tab);

      // callback function
      this._options.onShow(this, tab);
    }
  }

  window.Tabs = Tabs;

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-tabs-toggle]").forEach((triggerEl) => {
      const tabElements = [];
      let defaultTabId = null;
      triggerEl.querySelectorAll('[role="tab"]').forEach((el) => {
        const isActive = el.getAttribute("aria-selected") === "true";
        const tab = {
          id: el.getAttribute("data-tabs-target"),
          triggerEl: el,
          targetEl: document.querySelector(el.getAttribute("data-tabs-target")),
        };
        tabElements.push(tab);

        if (isActive) {
          defaultTabId = tab.id;
        }
      });
      new Tabs(tabElements, {
        defaultTabId: defaultTabId,
      });
    });
  });
} catch (error) {}

//=========================================//
/*        10) Accordion Component          */
//=========================================//
try {
  const AccordionDefault = {
    alwaysOpen: false,
    activeClasses: "bg-gray-50 text-blue-600",
    inactiveClasses: "text-dark",
    onOpen: () => {},
    onClose: () => {},
    onToggle: () => {},
  };

  class Accordion {
    constructor(items = [], options = {}) {
      this._items = items;
      this._options = { ...AccordionDefault, ...options };
      this._init();
    }

    _init() {
      if (this._items.length) {
        // show accordion item based on click
        this._items.map((item) => {
          if (item.active) {
            this.open(item.id);
          }

          item.triggerEl.addEventListener("click", () => {
            this.toggle(item.id);
          });
        });
      }
    }

    getItem(id) {
      return this._items.filter((item) => item.id === id)[0];
    }

    open(id) {
      const item = this.getItem(id);

      // don't hide other accordions if always open
      if (!this._options.alwaysOpen) {
        this._items.map((i) => {
          if (i !== item) {
            i.triggerEl.classList.remove(
              ...this._options.activeClasses.split(" "),
            );
            i.triggerEl.classList.add(
              ...this._options.inactiveClasses.split(" "),
            );
            i.targetEl.classList.add("hidden");
            i.triggerEl.setAttribute("aria-expanded", false);
            i.active = false;

            // rotate icon if set
            if (i.iconEl) {
              i.iconEl.classList.remove("rotate-180");
            }
          }
        });
      }

      // show active item
      item.triggerEl.classList.add(...this._options.activeClasses.split(" "));
      item.triggerEl.classList.remove(
        ...this._options.inactiveClasses.split(" "),
      );
      item.triggerEl.setAttribute("aria-expanded", true);
      item.targetEl.classList.remove("hidden");
      item.active = true;

      // rotate icon if set
      if (item.iconEl) {
        item.iconEl.classList.add("rotate-180");
      }

      // callback function
      this._options.onOpen(this, item);
    }

    toggle(id) {
      const item = this.getItem(id);

      if (item.active) {
        this.close(id);
      } else {
        this.open(id);
      }

      // callback function
      this._options.onToggle(this, item);
    }

    close(id) {
      const item = this.getItem(id);

      item.triggerEl.classList.remove(
        ...this._options.activeClasses.split(" "),
      );
      item.triggerEl.classList.add(...this._options.inactiveClasses.split(" "));
      item.targetEl.classList.add("hidden");
      item.triggerEl.setAttribute("aria-expanded", false);
      item.active = false;

      // rotate icon if set
      if (item.iconEl) {
        item.iconEl.classList.remove("rotate-180");
      }

      // callback function
      this._options.onClose(this, item);
    }
  }

  window.Accordion = Accordion;

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-accordion]").forEach((accordionEl) => {
      const alwaysOpen = accordionEl.getAttribute("data-accordion");
      const activeClasses = accordionEl.getAttribute("data-active-classes");
      const inactiveClasses = accordionEl.getAttribute("data-inactive-classes");

      const items = [];
      accordionEl.querySelectorAll("[data-accordion-target]").forEach((el) => {
        const item = {
          id: el.getAttribute("data-accordion-target"),
          triggerEl: el,
          targetEl: document.querySelector(
            el.getAttribute("data-accordion-target"),
          ),
          iconEl: el.querySelector("[data-accordion-icon]"),
          active: el.getAttribute("aria-expanded") === "true" ? true : false,
        };
        items.push(item);
      });

      new Accordion(items, {
        alwaysOpen: alwaysOpen === "open" ? true : false,
        activeClasses: activeClasses
          ? activeClasses
          : AccordionDefault.activeClasses,
        inactiveClasses: inactiveClasses
          ? inactiveClasses
          : AccordionDefault.inactiveClasses,
      });
    });
  });
} catch (error) {}
