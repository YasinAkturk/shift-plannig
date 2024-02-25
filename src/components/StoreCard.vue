<template>
    <div class="card-container">
        <div class="triangle"></div>
        <span class="font-weight-bold">Modern Evren Ankara</span>
        <span>Açılış: 09:00 - Kapanış: 21:00</span>
        <span class="box-warning">29-01-2024 04-02-2024 arasında Vardiya Planı Düzenlenebilir</span>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.card-container{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border: 1px solid #e7e7e7;
    border-radius: 12px;
    padding: 20px 65px;
    font-size: small;
    width: 550px;
    height: 120px;
}
.triangle {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-left: 35px solid transparent;
    border-bottom: 35px solid transparent;
    border-right: 35px solid #0ebed6;
    border-start-end-radius: 10px;
  }
.box-warning{
    font-size: 12px;
    font-weight: bold;
    color: #42bb75;
    background-color: #e6f8f0;
    border: 1px solid #42bb75;
    padding: 4px;
    border-radius: 8px;
}
</style>