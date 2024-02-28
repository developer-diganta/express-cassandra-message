module.exports = {
    fields: {
        id: {
            type: "timeuuid",
            rule:{
                required: true
            }
        },
        channel_id:{
            type:"varchar",
            rule:{
                required: true
            }
        },
        message_content: { 
            type: "varchar",
            rule: {
                default:"",
                // required: true,
                // validators:[
                //     {
                //         validator:function(value){
                //             return value.length>0
                //         }
                //     }
                // ]
            } 
        },
        attatchment:{
            type:"varchar",
            rule:{
                default:"",
            }
        },
        sender: {
            type:"uuid",
            rule:{
                required:true,
            }
        },
        receiver:{
            type:"uuid",
            rule:{
                required:true
            }
        },
        edited:{
            type:"boolean",
            default:false
        },
    },
    key : ["channel_id","id"],
    clustering_order: {"id": "desc"},
    table_name: "message_store",
    methods: {
        
    },
    options: {
        timestamps: {
            createdAt: 'created_at', // defaults to createdAt
            updatedAt: 'updated_at' // defaults to updatedAt
        },
        versions: {
            key: '__v' // defaults to __v
        }
    },
    before_save: function (instance, options) {
        if(!instance.message_content?.length && !instance.attatchment?.length){
            return false;
        }
    instance.message_content = instance.message_content?.trim();
    instance.attachment = instance.attachment?.trim();

    if (instance.message_content) {
        if (instance.message_content.length > 1000) {
            throw new Error("Message content exceeds the maximum allowed length.");
        }
    }

        return true;
    },
}

