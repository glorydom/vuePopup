<template>
<div>
  <el-container>
    <el-aside>
      <el-row class="tac">
        <el-col :span="20">
          <h5>数据来源</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">东方财富网</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-tickets"></i>
              <span slot="title">芝商所</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-main>
      <el-table
        :data="tableData" 
        style="width: 100%">
        <el-table-column
          label="标签"
          min-width="20%">
          <template slot-scope="scope">
            <i class="el-icon-arrow-right"></i>
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="代码"
          min-width="40%">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper" >
              <el-tag size="medium" v-for=" (item, key) in scope.row.codes" :key="key">{{ item }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="规则"
          min-width="20%">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cron | scheduleFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
      <el-row style="margin-top:10px">
        <el-button type="primary" plain icon="el-icon-circle-plus-outline" @click="openAddDialogue()">新增</el-button>
      </el-row>
    </el-main>

      <el-dialog title="新增抓取规则" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="标签" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="代码" :label-width="formLabelWidth">
            <el-input v-model="codesInput" placeholder="多个代码请使用,分割 " auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="规则" :label-width="formLabelWidth">
            <el-time-select
              v-model="schedule"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '24:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd()">确 定</el-button>
        </div>
        
      </el-dialog>

  </el-container>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        guid: "",
        name: "",
        codes: [],
        cron: 0
      },
      codesInput: "",
      formLabelWidth: "50px",
      tableData: [
        {
          guid: "",
          name: "黄豆",
          codes: ["ZC18H", "ZC18Z"],
          cron: 0
        },
        {
          guid: "",
          name: "黄豆",
          codes: ["ZC18H", "ZC18Z"],
          cron: "23 34 * * *"
        }
      ]
    };
  },
  computed: {
    schedule: {
      get: function() {
        if (!this.form.cron) return "";
        let vArray = this.form.cron.split(" ");
        return vArray[1] + ":" + vArray[0];
      },
      set: function(cron) {
        if(!cron) return "";
        let tArray = cron.split(":");
        this.form.cron = tArray[1] + " " + tArray[0] + " * * *";
        
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form.guid = row.guid;
      this.form.name = row.name;
      this.form.cron = row.cron;
      this.codesInput = row.codes.toString();

      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      let self = this;
      this.$http
        .post("/home/remove?guid=" + row.guid, row.guid)
        .then(function(response) {
          self.refresh();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openAddDialogue() {
      this.dialogFormVisible = true;
      this.form.guid = null;
      this.form.name = null;
      this.codesInput = "";
      this.form.cron = null;
      this.schedule = "";
    },
    getTimeFormat(t) {
      let value = t.toString();
      let vArray = value.split(" ");
      return vArray[1] + ":" + vArray[0];
    },
    handleAdd() {
      let self = this;
      this.form.codes = this.codesInput.split(",");
      if (this.form.guid) {
        this.$http
          .post("/home/update", this.form)
          .then(function(response) {
            self.refresh();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.$http
          .post("/home/add", this.form)
          .then(function(response) {
            self.refresh();
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      this.dialogFormVisible = false;
    },
    refresh() {
      let self = this;
      this.$http
        .get("/home/get")
        .then(function(response) {
          self.tableData = response.data;
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  filters: {
    scheduleFormat: function(value) {
      if (!value) return "";
      value = value.toString();
      let vArray = value.split(" ");

      return vArray[1] + ":" + vArray[0];
    }
  },
  mounted: function() {

    refresh();
  }
};
</script>