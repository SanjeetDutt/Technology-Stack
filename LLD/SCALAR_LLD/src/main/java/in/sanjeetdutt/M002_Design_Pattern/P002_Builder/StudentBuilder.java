package in.sanjeetdutt.M002_Design_Pattern.P002_Builder;

public class StudentBuilder{
    private String name;
    private Integer age;
    private Integer phone = null; // Default value

    public Student build()  {
        return new Student(name, age, phone);
    }

    public StudentBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public StudentBuilder setAge(int age) {
        this.age = age;
        return this;
    }

    public StudentBuilder setPhone(Integer phone) {
        this.phone = phone;
        return this;
    }
}
