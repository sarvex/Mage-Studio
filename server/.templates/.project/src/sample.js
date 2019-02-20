export const script = {

   start: function() {
       this.angle = 0;
   },

   update: function() {
       this.angle += 0.01;
       this.setRotation({ y: this.angle });
   }
   
};
