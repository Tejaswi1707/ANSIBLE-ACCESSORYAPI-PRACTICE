package com.klef.practice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "accessory_table")
public class Accessory {

    @Id
    @Column(name = "aid")
    private int id;

    @Column(name = "aname", length = 100, nullable = false)
    private String name;

    @Column(name = "abrand", length = 50, nullable = false)
    private String brand;

    @Column(name = "acategory", length = 50, nullable = false)
    private String category;

    @Column(name = "aprice", nullable = false)
    private double price;

    @Column(name = "awarranty", length = 50, nullable = false)
    private String warranty;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getWarranty() { return warranty; }
    public void setWarranty(String warranty) { this.warranty = warranty; }

    @Override
    public String toString() {
        return "Accessory [id=" + id + ", name=" + name + ", brand=" + brand + ", category=" + category
                + ", price=" + price + ", warranty=" + warranty + "]";
    }
}
