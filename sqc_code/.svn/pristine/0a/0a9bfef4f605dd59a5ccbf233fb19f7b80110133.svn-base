<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div class="not-print">
        <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">项目名称: </span>
                <span class="expand-value">{{ row.goodsName }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">规格: </span>
                <span class="expand-value">{{ row.spec }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">单位: </span>
                <span class="expand-value">{{ row.unit }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">单价: </span>
                <span class="expand-value">{{ row.price }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <span class="expand-key">折扣: </span>
                <span class="expand-value">{{ row.discount }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">购买数量: </span>
                <span class="expand-value">{{ row.num }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">总价: </span>
                <span class="expand-value">{{ row.num }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">可退数量: </span>
                <span class="expand-value">{{ row.tfNum }}</span>
            </Col>
        </Row>
        <div class="line"></div>
        <Form>
            <Row>
                <Col span="6">
                    <formItem label="退费数量">
                        <InputNumber :max="row.tfNum" :min="1" v-model="giveBackNum"></InputNumber>
                    </formItem>
                </Col>
                <Col span="6">
                    <Button type="primary" @click="checkTfNum">确认</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data () {
            return {
                giveBackNum: 0
            }
        },
        methods: {
            checkTfNum () {
                let that = this
                that.$emit('introduce', {
                    id: that.row.id,
                    giveBackNum: that.giveBackNum
                })
            }
        }
    };
</script>
<style>
    .line{
        width: 100%;
        height: 1px;
        background: #ccc;
        margin: 20px 0;
    }
</style>
