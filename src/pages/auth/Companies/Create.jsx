import { memo, useEffect, useState } from "react";
import { z } from "zod";
import { H4Header, H6Header } from "../../../Companents/UIs/Headers";
import CreateForm from "../../../Companents/SubmitForms/CreateForm";
import { useParams } from "react-router-dom";

const Create = () => {
    const { id } = useParams(),
        api_url = id ? `companies/${id}` : `companies`,
        [formConfig] = useState({
        module_title: "Company",
        sub_title: "Create Company",
        form_name: "create_company",
        id: id,
        fetch_api_url: `companies/${id}`,
        fetch_api_method: 'get',
        api_url: api_url,
        api_method: id ? 'put' : 'post',
        fields: [
            {
                name: "name",
                label: "Name",
                type: "text",
                validation: z.string().min(1, { message: "Name is required" }),
            },
            {
                name: "contact_email",
                label: "Contact email",
                type: "email",
                validation: z.string().min(1, { message: "Contact email is required" }).email(),
            },
            {
                name: "contact_number",
                label: "Contact number",
                type: "text",
                validation: z.string(),
            },
            {
                name: "contact_person",
                label: "Contact name",
                type: "text",
                validation: z.string().min(1, { message: "Contact name is required" }),
            },
            {
                name: "gst_no",
                label: "GST no",
                type: "text",
                validation: z.string().nullable(),
            },
            {
                name: "location",
                label: "Location",
                type: "text",
                validation: z.string().nullable(),
            },
            {
                name: "fax",
                label: "FAX",
                type: "text",
                validation: z.string().nullable(),
            },
            {
                name: "website",
                label: "Website",
                type: "text",
                validation: z.string().nullable(),
            },
            {
                name: "status",
                label: "Status",
                type: "boolean",
                validation: z.union([z.number(), z.boolean()]),
            }
        ],
    });

    return (
        <div className="row">
            <div className="masonry-item col">
                <div className="bgc-white p-20 bd">
                    <H4Header title={formConfig.module_title} />
                    <H6Header title={formConfig.sub_title} />
                    <CreateForm formConfig={formConfig} />
                </div>
            </div>
        </div>
    );
};

export default memo(Create);
