
const scrollFunc = () => {
    var self = this;

      var scrolled = window.pageYOffset;
      var screenHeight = screen.height;

      self.scrollBubbles.forEach(bubble => {
        var BubbleOffset =  document.getElementById(bubble).offsetTop;
        if ((scrolled + screenHeight) > (BubbleOffset)) {
          var findIndex = self.scrollBubbles.findIndex(item => {
            return item === bubble
          });
          self.addAnimation(scrollAnimation, {name: bubble});
          self.scrollBubbles.splice(findIndex, 1);
          if (self.scrollBubbles.length === 0) {
            self.scrollFunc = false;
          }
        }
      });

};

export default scrollFunc;