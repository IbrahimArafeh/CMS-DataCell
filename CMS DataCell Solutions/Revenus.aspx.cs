using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using CMS_DataCell_Solutions.Models;

namespace CMS_DataCell_Solutions
{
    public partial class _ٌRevenus : System.Web.UI.Page
    {
        SqlConnection conn = new SqlConnection("Data Source=.;Initial Catalog=OpenData;User ID=sa;Password=P@ssw0rd");
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                List<Revenue> revenusList = loadRevenusData();

                //HiddenFieldDeleteRevenus.Value = JsonConvert.SerializeObject(deletedUserList);

                //List<Revenue> revList = new List<Revenue>();
                //revList = db.Revenues.ToList();
                //DataTable dt = new DataTable();
                //List<Revenue> revenusList = new List<Revenue>();

                //foreach (var row in revList)
                //{
                //    Revenue newRevenus = new Revenue();

                //    newRevenus.ID = row.ID;
                //    newRevenus.TotalRevenue = (double)row.TotalRevenue;
                //    newRevenus.Year = (double)row.Year;

                //    revenusList.Add(newRevenus);
                //}


                HiddenFieldRevenus.Value = JsonConvert.SerializeObject(revenusList);
            }
        }


        protected void btnSave_Click(object sender, EventArgs e)
        {
            //List<Revenue> RevenusList = JsonConvert.DeserializeObject<List<Revenue>>(HiddenFieldRevenus.Value);
            //foreach (Revenue Revenus in RevenusList)
            //{
            //    if (Revenus.ID == -1)
            //    {
            //        db.Revenues.Add(Revenus);
            //        db.SaveChanges();
            //    }
            //    else
            //    {
            //        db.Revenues.Add(Revenus);
            //        db.Entry(Revenus).State = System.Data.Entity.EntityState.Modified;
            //        db.SaveChanges();
            //    }
            //}

            //List<Revenue> deletedRevenueList = JsonConvert.DeserializeObject<List<Revenue>>(HiddenFieldDeleteRevenus.Value);
            //foreach (Revenue revenue in deletedRevenueList)
            //{
            //    db.Revenues.Attach(revenue);
            //    db.Revenues.Remove(revenue);
            //    db.SaveChanges();
            //}

            //divSuccessAlert.Visible = true;
        }

        public List<Revenue> loadRevenusData()
        {
            //insert connamd

            //SqlCommand comm = new SqlCommand("Insert into Revenus values (" + "" + ")", conn);
            //comm.ExecuteNonQuery();

            //SqlCommand comm2 = new SqlCommand("Select * from Revenues", conn);
            //SqlDataAdapter sqd = new SqlDataAdapter(comm2);
            //DataTable dt = new DataTable();
            //sqd.Fill(dt);
            //RevenusDGV.DataSource = dt;
            //RevenusDGV.DataBind();
            List<Revenue> reveList = new List<Revenue>();

            try
            {
                conn.Open();
               
                using (SqlCommand cmd = new SqlCommand("Select * from Revenues", conn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Revenue rev = new Revenue();
                            rev.ID = (int)reader["ID"];
                            rev.TotalRevenue = (double)reader["TotalRevenue"];
                            rev.Year = Convert.ToInt32(reader["Year"]);
                            reveList.Add(rev);
                        }
                    }
                }

                conn.Close();
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return reveList;
        }
    }
}