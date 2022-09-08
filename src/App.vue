<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';
import AppAlert from '@/components/app/AppAlert.vue';
</script>

<template>
	<TheHeader></TheHeader>
	<TheView></TheView>
	<!--
		 AppAlert 컴포넌트가 edit, create 컴포넌트의 Template 속에 들어있으면
		 수정/등록 후 해당 컴포넌트들이 닫히고 list 컴포넌트로 router이동하므로 AppAlert 컴포넌트가 사라져
		 alert이 생성되지 않는다. 
	-->
	<AppAlert> </AppAlert>
</template>

<style></style>
