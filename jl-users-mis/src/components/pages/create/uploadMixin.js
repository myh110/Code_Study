

export default {
    methods: {
        /**
         * 上传前检查的的类型 大小
         * size 5M 
         * type jpeg png
         * before-upload cb
         */
        checkImgFile(file) {
            // debugger
            const isImg = (file.type === "image/jpeg") || (file.type === "image/png");
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isImg) {
                this.$message.error("上传图片只能是 JPG、PNG 格式!");
            }
            if (!isLt5M) {
                this.$message.error("上传图片大小不能超过 5MB!");
            }
            return isImg && isImg;
        },
        checkVideoFile(file) {
            // debugger
            const isVideo = (file.type === "video/mp4");
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isVideo) {
                this.$message.error("上传视频只能是 MP4 格式!");
            }
            if (!isLt10M) {
                this.$message.error("上传图片大小不能超过 10MB!");
            }
            return isVideo && isLt10M;
        },

        checkImgFileJGG(file){
            let _t = this;
            let num = 9 - _t.game_data.video_list.length - _t.game_data.img_list.length ;
            if(num == 0){
                this.$message.error("图片上传张数达到上线！");
            }
            return _t.checkImgFile(file) && ( num > 0 ) 
            // this.$message.error("上传图片只能是 JPG、PNG 格式!");
        },
        checkVideoFileJGG(file){
            let _t = this;
            let num = 9 - _t.game_data.video_list.length - _t.game_data.img_list.length ; 
            if(num == 0){
                this.$message.error("九宫格上传达数到上限！");
            }
            if(_t.game_data.video_list.length > 0){
                this.$message.error("九宫格视频只能上传一张！");
            }
            return _t.checkVideoFile(file) && ( num > 0 ) && (_t.game_data.video_list.length === 0) 
        },

        // 上传图片失败回调
        uploadFailCb(err, file, fileList) {
            this.$message.error(file.name + "上传文件失败!");
        }
    }
}