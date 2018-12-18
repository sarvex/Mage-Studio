export const script = {

   start: function() {
       this.angle = 0;
       this.mesh.rotation.y = Math.PI/3;
       this.mesh.position.z = -40;
   },

   update: function() {
       //this.mesh.position.y = -1.5 + (Math.cos(this.angle));
       this.mesh.rotation.z = 0.05 * Math.sin(this.angle);
       this.mesh.rotation.x = 0.03 * Math.sin(this.angle);
       this.angle += 0.003;//0.07;
   }

};
