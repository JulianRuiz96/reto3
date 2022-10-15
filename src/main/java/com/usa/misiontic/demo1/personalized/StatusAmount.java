package com.usa.misiontic.demo1.personalized;



public class   StatusAmount {
    private int completed;
    private int canceled;

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCanceled() {
        return canceled;
    }

    public void setCanceled(int canceled) {
        this.canceled = canceled;
    }

    public StatusAmount(int completed, int canceled) {
        this.completed = completed;
        this.canceled = canceled;
    }

    public StatusAmount() {
    }
}
