<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <label class="modal-default-button" @click="$emit('closeModal')">
              关闭
            </label>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    font-size: 13px;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
    line-height: 1.5;
  }

  .body-header {
    border-bottom: solid 1px #f2f2f2;
  }
  .modal-footer {
    overflow: hidden;
  }
  .modal-default-button {
    float: right;
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: solid 1px #f2f2f2;
    border-radius: 10px;
    color: #ffffff;
    background: #3ca777;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }
</style>
