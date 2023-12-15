import { useEffect } from "react";
import jQuery from "jquery";
import { HiBars3 } from "react-icons/hi2";

const SidebarToggle = () => {
  useEffect(() => {
    const $ = jQuery.noConflict();

    const handleToggle = () => {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      $(".sidebar").hasClass("toggled") &&
        $(".sidebar .collapse").removeClass("show");
    };

    const handleResize = () => {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").removeClass("show");
      }

      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $(".sidebar .collapse").removeClass("show");
      }
    };

    const handleScroll = () => {
      if ($(document).scrollTop() > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    };

    const handleScrollToTopClick = (e) => {
      const target = $(e.currentTarget);
      $("html, body")
        .stop()
        .animate(
          { scrollTop: $(target.attr("href")).offset().top },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    };

    $("#sidebarToggle, #sidebarToggleTop").on("click", handleToggle);
    $(window).on("resize", handleResize);
    $(document).on("scroll", handleScroll);
    $(document).on("click", "a.scroll-to-top", handleScrollToTopClick);

    // eslint-disable-next-line
    return () => {
      // Cleanup event listeners when component is unmounted
      $("#sidebarToggle, #sidebarToggleTop").off("click", handleToggle);
      $(window).off("resize", handleResize);
      $(document).off("scroll", handleScroll);
      $(document).off("click", "a.scroll-to-top", handleScrollToTopClick);
    };
  }, []);
  return (
    <div className="text-center d-none d-md-inline">
      {/* <button
    className="rounded-circle border-0"
    id="sidebarToggle"
  ></button> */}
      <HiBars3 id="sidebarToggle" />
    </div>
  );
};
export default SidebarToggle;
