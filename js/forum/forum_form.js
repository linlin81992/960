new Vue({
  el: "#forum_form",
  data() {
    return {
      isOpen: false,
      isShareOpen: false
    }

  },
  computed: {

  },
  methods: {
    typeDropdown() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true
      }
    },
    selectType(type) {
      this.type = type
      this.typeDropdown()
    },
    shareDropdown() {
      if (this.isShareOpen) {
        this.isShareOpen = false;
      } else {
        this.isShareOpen = true
      }
    },
    selectQU(type) {
      this.type = type
      this.shareDropdown()
    }
  },
});