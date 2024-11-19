import { memo, useEffect, useState } from "react";
import { z } from "zod";
import { H4Header, H6Header } from "../../../Companents/UIs/Headers";
import CreateForm from "../../../Companents/SubmitForms/CreateForm";
import { useParams } from "react-router-dom";
import apiService from "../../../apis/apiService";

const Create = () => {
    const { id } = useParams(),
        api_url = id ? `users/${id}` : `users`,
        formConfig = {
        module_title: "Users",
        sub_title: "Create User",
        form_name: "create_user",
        id: id,
        fetch_api_url: `users/${id}`,
        fetch_api_method: 'get',
        api_url: api_url,
        api_method: id ? 'put' : 'post',
        fields: [
            {
                name: "first_name",
                label: "First Name",
                type: "text",
                validation: z.string().min(1, { message: "First name is required" }),
            },
            {
                name: "last_name",
                label: "Last Name",
                type: "text",
                validation: z.string().min(1, { message: "Last name is required" }),
            },
            {
                name: "email",
                label: "Email",
                type: "email",
                validation: z.string().min(1, { message: "Email is required" }).email(),
            },
            {
                name: "username",
                label: "Username",
                type: "text",
                validation: z.string().min(1, { message: "Username is required" }),
            },
            {
                name: "password",
                label: "password",
                type: "password",
                validation: z.string().min(4),
            },
            {
                name: "role",
                label: "Role",
                type: "select",
                options: [
                    { label: "Company Admin", value: "Company Admin" },
                    { label: "Admin", value: "Admin" },
                    { label: "Clerk", value: "Clerk" },
                ], // This will be populated from the API in `fetchData`
                validation: z.string().min(1, "Role is required"),
            },
            {
                name: "phone_number",
                label: "Phone number",
                type: "text",
                validation: z.string(),
            },
            {
                name: "company",
                label: "Companies",
                type: "multiselect",
                options: [],
                // validation: z.string(),
            },
            {
                name: "status",
                label: "Status",
                type: "boolean",
                validation: z.union([z.number(), z.boolean()]),
            }
        ],
    };

    return (
        <div className="row">
            <div className="masonry-item col">
                <div className="bgc-white p-20 bd">
                    <H4Header title={formConfig.module_title} />
                    <H6Header title={formConfig.sub_title} />
                    <CreateForm formConfig={formConfig}/>
                </div>
            </div>
        </div>
    );
};

export default memo(Create);
